import React, {useState,memo} from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { FiEye,FiEyeOff } from "react-icons/fi";import { useFormik } from 'formik';
import { loginSchema } from '../../../validations';
import classNames from 'classnames';
import { Dialog } from '@material-tailwind/react';
import { MdOutgoingMail } from "react-icons/md";
import { validateEmail } from '../../../hooks/validate-email';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import axios from 'axios';
import login from '../../../services/auth/login';
import resetPassword from '../../../services/auth/reset-password';
import {ScaleLoader} from "react-spinners";
import { setToken } from '../../../stores/auth/actions';
import {  decodeToken } from "react-jwt";

const Form =  ({isAdmin}) => {

    const [isHidden, setisHidden] = useState(true);
    const [openModal, setopenModal] = useState(false);
    const [resetMail, setResetMail] = useState('');
    const [mailMessage, setMailMessage] = useState(false);
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    
    
    const handleResetPass = async () => {

        if(validateEmail(resetMail)){

            setMailMessage(false);
            setopenModal(false);

            const result = await resetPassword(resetMail);

            if(result.res){
                toast(result.message,{'type': 'success'})
            }
            else{
                toast(result.message,{'type': 'error'})
            }

            
        }else{
            setMailMessage(true);
        }
    }



    const handleGoogleLogin = useGoogleLogin({

    
        onSuccess: (result) => {

            setLoader(true);

            axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${result.access_token}`, {
                headers: {
                    Authorization: `Bearer ${result.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {

                let loginUser = {
                    'email' : res['data']['email'],
                    'password' : Math.random().toString(10).substr(2),  // Google girişleri şifresiz şekilde doğrulandı
                    'isAdmin' : isAdmin,
                    'isGoogle' : 1
                };

                login(loginUser).then((result)=>{

                    setLoader(false);
                    

                    if(result.res){


                        setToken(result.data.token);
                        const myToken = decodeToken(result.data.token);
                    

                        toast(result.message,{type: 'success'});
                        {myToken.isAdmin == 0 ? navigate('/customer') : navigate('/admin')}

                    }
                    else {
                        toast(result.message,{type: 'error'});
                    }
                        }).catch((err)=> toast(err.message, {type:  'error'}));

                    })
                    
            .catch((err) => {
                setLoader(false);
                toast(err.message, {type: 'error'})
            });
        },

        onError: () => {
            setLoader(false);
            toast('Giriş yapılamadı', {type: 'error'})
        }
    })


    const { handleSubmit, handleChange, values, errors ,touched} = useFormik({

        initialValues:{
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async  (values)=> {

            values['isAdmin'] = isAdmin;
            values['isGoogle'] = 0;
            setLoader(true);

            const result = await login(values);
            
            setLoader(false);


            if(result.res){


                setToken(result.data.token);
                const myToken = decodeToken(result.data.token);
               

                toast(result.message,{type: 'success'});
                {myToken.isAdmin == 0 ? navigate('/customer') : navigate('/admin')}

            }
            else {
                toast(result.message,{type: 'error'});
            }
        }

    });

    return (
        <>

            <Dialog style={{background: 'none', display:'flex', alignItems:'center', justifyContent: 'center', outline: 'none', border: 'none', boxShadow: 'none'}} open={loader}>
                <ScaleLoader className='' color='white'  />
            </Dialog>
        
            <form className='flex items-center flex-col justify-center h-[80%]' onSubmit={handleSubmit}>

           
                <Dialog  style={{zIndex: 100}} open={openModal} >
                    <div className='border border-ligth-gray/20 bg-main rounded-md p-5 flex items-start w-full justify-center flex-col'>
                        <h2 className='poppins-medium  text-[20px] text-dark-gray '> Şifre sıfırlama</h2>

                        <div className='h-[1px] w-full my-4 bg-ligth-gray/40'></div>

                        <div className='relative w-full'>
                            <input placeholder="Email" value={resetMail} type='email' onChange={(e)=>setResetMail(e.target.value)} values={values.password}  name="password" className="w-full  border border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4"/>
                            <div className='absolute cursor-pointer right-5 top-[40%]'>
                                <MdOutgoingMail  size={30}/>
                            </div>
                        </div>
                        {mailMessage == true ?   (<div className='text-dark-red/70 w-full text-[13px]'>Geçersiz mail adresi </div>) : ""  }
                        <div className='flex flex-row items-center w-full gap-x-4  justify-between'>

                            <button className={classNames('mt-6 select-none hover:bg-main bg-white outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold border border-ligth-gray/20')} onClick={()=> setopenModal(false)}  type="button">Cancel</button>
                            <button className={classNames('mt-6 select-none hover:bg-dark-orange/[95%] bg-dark-orange outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold  text-white ')} onClick={()=> handleResetPass() } type="button">Gönder</button>

                        </div>
                    </div>
                </Dialog>
                                
                <input placeholder='Email' name="email" onChange={handleChange} values={values.email} className="w-full border  border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4" />
                {errors.email && touched.email ? ( <div className='text-dark-red/70 w-full text-[13px]'>{errors.email} </div> ) : null}

                <div className='relative w-full'>
                    <input placeholder="Password" type={isHidden ? 'password' : 'text'} onChange={handleChange} values={values.password}  name="password" className="w-full  border border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4"/>
                    <button onClick={(e)=> {e.preventDefault(),setisHidden(values => !values)}} className='absolute cursor-pointer right-5 top-1/2'>
                        {
                            isHidden ? <FiEyeOff/> : <FiEye/>  
                        }
                    </button>
                </div>
                
                {errors.password && touched.password ? ( <div className='text-dark-red/70 w-full text-[13px]'>{errors.password}</div>) : null}

                <div className='flex mt-6 flex-row w-full items-center justify-end'>
                    <p className=' text-[14px] text-dark-orange cursor-pointer' onClick={()=> setopenModal(true)}>Şifreni mi unuttun ?</p>
                </div>
                
                <button className={classNames('mt-6 select-none hover:bg-dark-orange/[95%] bg-dark-orange outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold  text-white')}  type="submit">Giriş Yap</button>
                <div className='w-full mt-8 h-[35px] flex flex-row items-center justify-center'>

                    <div className='h-[1px] my-auto bg-ligth-gray/20 flex-1 mt-4'/>
                    <p className='mx-4 block text-[12px] text-ligth-gray'>Veya şunun ile devam et </p>
                    <div className='h-[1px] my-auto bg-ligth-gray/20 flex-1 mt-4'/>

                </div>
                
                
            </form>

            <div className='h-[20%] flex items-center justify-center flex-col '>

                <button className=' hover:bg-main mb-4  bg-white outline-none rounded-md cursor-pointer py-2.5 w-full text-dark-gray border border-ligth-gray flex flex-row items-center poppins-medium justify-center gap-x-4' onClick={()=> handleGoogleLogin()} type="button"><FcGoogle size={26} />Google</button>

                <p className='text-[14px] mb-12'>Henüz bir hesabın yokmu ?  <span className='text-dark-orange underline cursor-pointer' onClick={()=> navigate('/register')}>Kayıt Ol</span></p>
            
            </div>
        </> 
    )
}

export default memo(Form);
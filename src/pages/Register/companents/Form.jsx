import React, {useState,useEffect} from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { FiEye,FiEyeOff } from "react-icons/fi";import { useFormik } from 'formik';
import { registerSchema } from '../../../validations';
import { isRegister,status } from '../../../stores/auth/hooks';
import { register } from '../../../stores/auth/actions';
import classNames from 'classnames';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import axios from 'axios';

const Form = ({isAdmin}) => {

    const [isHidden, setisHidden] = useState(true);
    const navigate = useNavigate();

    let _isRegister = isRegister();
    let _registerStatus = status();
    
    useEffect(()=> {

        if(_isRegister && _registerStatus == 'fulFilled'){
            navigate('/login',{replace: true})
        }
    },[_isRegister]);

    const handleGoogleRegister = useGoogleLogin({

        onSuccess: (result) => {
            axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${result.access_token}`, {
                headers: {
                    Authorization: `Bearer ${result.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {

                console.log(res);

                let newsUser = {

                    'name': res['data']['given_name'],
                    'surname' : res['data']['family_name'],
                    'email' : res['data']['email'],
                    'password' :  Math.random().toString(10).substr(2),  // Google ile girişlerde şifre bilgisi alınamıyor, hata vermemesi adına eklendi düzenlenecek
                    'isAdmin' : isAdmin,
                    'isGoogle' :1
                };

                register(newsUser);

            })
            .catch((err) => toast(err.message, {type: 'error'}));
        },

        onError: () => toast('Kayıt yapılamadı', {type: 'error'})
    });


    const { handleSubmit, handleChange, values, errors ,touched} = useFormik({

        initialValues:{
            name: '',
            surname : '',
            email: '',
            password: '',
        },

        validationSchema: registerSchema,
        onSubmit: (values)=> {
            values['isAdmin'] = isAdmin;
            values['isGoogle'] = 0;
            register(values);
        }

    });

    return (

        <>
            <form className='flex items-center flex-col justify-center h-[80%]' onSubmit={handleSubmit}>
                <div className='flex flex-row items-center w-full gap-x-4 justify-center'>

                    <div className='w-full'>
                        <input placeholder='Name' name="name" onChange={handleChange} values={values.name} className="w-full border  border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4" />
                        {errors.name && touched.name ? ( <div className='text-dark-red w-full text-[13px]'>{errors.name} </div> ) : null}
                    </div>

                    <div className='w-full'> 
                        <input placeholder='Surname' name="surname" onChange={handleChange} values={values.surname} className="w-full border  border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4" />
                        {errors.surname && touched.surname ? ( <div className='text-dark-red w-full text-[13px]'>{errors.surname} </div> ) : null}

                    </div>

                </div>
                                                    
                <input placeholder='Email' name="email" onChange={handleChange} values={values.email} className="w-full border  border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4" />
                {errors.email && touched.email ? ( <div className='text-dark-red w-full text-[13px]'>{errors.email} </div> ) : null}

                <div className='relative w-full'>
                    <input placeholder="Password" type={isHidden ? 'password' : 'text'} onChange={handleChange} values={values.password}  name="password" className="w-full  border border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4"/>
                    <button onClick={(e)=> {e.preventDefault(),setisHidden(values => !values)}} className='absolute cursor-pointer right-5 top-1/2'>
                        {
                            isHidden ? <FiEyeOff/> : <FiEye/>  
                        }
                        
                    </button>
                </div>
                
                {errors.password && touched.password ? ( <div className='text-dark-red w-full text-[13px]'>{errors.password}</div>) : null}
                
                <button className={classNames('mt-12 select-none hover:bg-dark-blue/[90%] bg-dark-blue outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold  text-white', {'bg-dark-blue/80': _registerStatus == 'pending'})}  type="submit">{_registerStatus == 'pending' ? "Yükleniyor": "Kaydol"}</button>
                <div className='w-full mt-8 h-[35px] flex flex-row items-center justify-center'>

                    <div className='h-[1px] my-auto bg-ligth-gray/20 flex-1 mt-4'/>
                    <p className='mx-4 block text-[12px] text-ligth-gray'>Veya şunun ile devam et </p>
                    <div className='h-[1px] my-auto bg-ligth-gray/20 flex-1 mt-4'/>

                </div>

                

            </form>

            <div className='h-[20%]  flex items-center justify-center flex-col '>

                <button className=' hover:bg-main mb-4  bg-white outline-none rounded-md cursor-pointer py-2.5 w-full text-dark-gray border border-ligth-gray flex flex-row items-center poppins-medium justify-center gap-x-4' onClick={()=> handleGoogleRegister()} type="button"><FcGoogle size={26} />Google</button>

                <p className='text-[14px] mb-12'>Zaten bir hesabın varmı?  <span className='text-dark-orange underline cursor-pointer' onClick={()=> navigate('/login')}>Giriş Yap</span></p>
            
            </div>

        </>
    )
}

export default Form
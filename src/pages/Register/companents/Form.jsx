import React, {useState} from 'react'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { FiEye,FiEyeOff } from "react-icons/fi";import { useFormik } from 'formik';
import { loginSchema } from '../../../validations';

const Form = ({type}) => {

    const [isHidden, setisHidden] = useState(true);

    const navigate = useNavigate();

    const { handleSubmit, handleChange, values, errors ,touched} = useFormik({

        initialValues:{
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values)=> console.log(values)

    });

    return (
            <form className='flex items-center flex-col justify-center h-full' onSubmit={handleSubmit}>
                                                    
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
                
                <button className='mt-12 select-none hover:bg-dark-blue/[90%] bg-dark-blue outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold  text-white' type="submit">Kaydol</button>
                <div className='w-full mt-8 h-[35px] flex flex-row items-center justify-center'>

                    <div className='h-[1px] my-auto bg-ligth-gray/20 flex-1 mt-4'/>
                    <p className='mx-4 block text-[12px] text-ligth-gray'>Veya şunun ile devam et </p>
                    <div className='h-[1px] my-auto bg-ligth-gray/20 flex-1 mt-4'/>

                </div>

                <button className='mt-8 hover:bg-main  bg-white outline-none rounded-md cursor-pointer py-2.5 w-full text-dark-gray border border-ligth-gray flex flex-row items-center poppins-medium justify-center gap-x-4' type="submit"><FcGoogle size={26} />Google</button>

                <p className='text-[14px] mt-6'>Zaten bir hesabın varmı?  <span className='text-dark-blue underline cursor-pointer' onClick={()=> navigate('/login')}>Giriş Yap</span></p>
            </form>
    )
}

export default Form
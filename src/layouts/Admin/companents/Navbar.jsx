import React from 'react'
import logo from '../../../assets/login-form-logo.png'
import { memo } from 'react'
import { ADMİN_NAVBAR } from '../../../utils/consts/navbar'
import { decodeToken } from 'react-jwt';
import { useToken } from '../../../stores/auth/hooks';


const Navbar = () => {

    const token = decodeToken(useToken());

    const username = token.username;
    const profile = token.profile;

    
    return (
        <div className='w-full h-[80px]  flex items-center justify-between bg-white border-b py-2 px-16'>
            <a href='/admin/' className='w-[10%] h-full'>

                <img src={logo} alt="Resbul logo" className='w-full h-full object-contain'/>

            </a>
            <div className='h-full w-min py-1 flex flex-row items-center  justify-end'>
                <div className='w-max h-full flex items-center flex-row justify-center'>
                    {
                        ADMİN_NAVBAR.map((item, index)=>{
                            return (
                                <a href={item.path} className='flex items-center h-full justify-between gap-x-3 mr-12'>

                                    <div>   

                                            {item.icon}
                                    
                                    </div>

                                    <span key={index} className='h-full flex items-center text-[16px] cursor-pointer roboto-regular text-dark-gray/80' >{item.title}</span>

                                </a>
                            )
                        })
                    }
                    
                </div>
                <div className='h-full  w-max flex flex-col items-center justify-center'>
                    <a href="/admin/profile" className='flex items-center gap-x-4 rounded-full bg-main pr-6 border border-ligth-gray/20 justify-center'>
                        <div className='h-[45px] w-[45px]  rounded-full '>
                            <img className='rounded-full w-full h-full object-center ' src={import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+profile} alt="" />
                        </div>
                        <span className='roboto-regular'>
                            {username}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default memo(Navbar)
import React from 'react'
import logo from '../../../assets/login-form-logo.png'
import { memo } from 'react'
import { ADMİN_NAVBAR } from '../../../utils/consts/navbar'

const Navbar = () => {
  return (
    <div className='w-full h-[8%]  flex items-center justify-between bg-white border-b py-3 px-16'>
        <div className='w-[10%] h-full'>

            <img src={logo} alt="Resbul logo" className='w-full h-full object-contain'/>

        </div>
        <div className='h-full w-min py-1 flex flex-row items-center justify-end'>
            <div className='w-max h-full flex items-center flex-row justify-center'>
                {
                    ADMİN_NAVBAR.map((item, index)=>{
                        return (
                            <a key={index} className='h-full flex items-center  px-6 cursor-pointer roboto-regular text-dark-gray/70' href={item.path}>{item.title}</a>
                        )
                    })
                }
                
            </div>
            <div className='h-full'>
                <a href="/admin/profile" className='h-full w-[100px] rounded-md cursor-pointer flex items-center justify-center text-white poppins-regular  bg-dark-orange'>Profil</a>
            </div>
        </div>
    </div>
  )
}

export default memo(Navbar)
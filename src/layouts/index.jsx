import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const index = () => {
  return (
    <div className='w-full h-full bg-main overflow-scroll  '>
      <ToastContainer/>
      <Outlet/>
    </div>
  )
}

export default index;
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./companents/Navbar"
const index = () => {
  return (
    <div className='bg-main w-full h-full'>
        
        <Navbar/>
        <div className='xl:px-[200px] px-[10px] w-full flex-1'>
          <Outlet/>
        </div>

    </div>
  )
}

export default index
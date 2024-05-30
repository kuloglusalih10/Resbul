import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "./companents/Navbar"
const index = () => {
  return (
    <div className='bg-main w-full h-full'>
        
        <Navbar/>
        <div className='px-[200px] w-full flex-1'>
          <Outlet/>
        </div>

    </div>
  )
}

export default index
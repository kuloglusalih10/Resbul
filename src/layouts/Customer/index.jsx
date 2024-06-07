import React from 'react'
import { Outlet } from 'react-router-dom'

const index = () => {
  return (
    <div className='xl:px-[200px] px-[10px] w-full flex-1 '>
        <Outlet/>
    </div>
  )
}

export default index
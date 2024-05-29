import React from 'react'
import { Outlet } from 'react-router-dom'

const index = () => {
  return (
    <div>
        Customer Layout
        <Outlet/>
    </div>
  )
}

export default index
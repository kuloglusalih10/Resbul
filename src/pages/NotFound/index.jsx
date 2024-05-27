import React from 'react'
import Lottie from "lottie-react";
import animation404 from "../../assets/404.json"

const index = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
        
        <Lottie animationData={animation404}/>
        <h2 className='text-[25px] poppins-semibold mt-8 text-dark-gray/80'>Sayfa Bulunamadı !</h2>
    </div>
  )
}

export default index
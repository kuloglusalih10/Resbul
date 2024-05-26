import React from 'react'
import bg from "../../assets/Kaiyo.jpg"
import logo from "../../assets/logo-no-background.png"
import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";

const index = () => {
    const navigate = useNavigate();
  return (
    <div className="flex-1 h-full w-full relative flex items-center flex-col justify-center" >

        <div className='w-full h-full overflow-hidden flex flex-col items-center justify-center'>
            <img src={bg}  className='absolute top-0 left-0 bottom-0 right-0   object-cover sm:object-fill  h-full  w-full' alt="Resbul İmage" />
            <div className='absolute top-0 left-0 bottom-0 bg-black/60 right-0 z-20'></div>

            <div initial={{ opacity: 0, x: "-40%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "40%" }} className='z-20 w-1/4 h-1/4 touch-none mb-8 flex items-center select-none  flex-col justify-center'>
                <motion.img initial={{ opacity: 0, x: "-40%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "40%" }} src={logo} alt="Resbul logo" className='object-contain pointer-events-none w-full h-full'/>
                <motion.h3 initial={{ opacity: 0, x: "40%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "-40%" }} className='text-white roboto-regular-italic text-center select-none mt-16 text-[18px]'>Bölgenizdeki en iyi restoran ve kafeleri keşfedin ...</motion.h3>
                <motion.button onClick={()=> navigate('/login')} initial={{ opacity: 0, x: "-40%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "40%" }} className='mt-12 bg-dark-orange outline-none rounded-md cursor-pointer py-2.5 px-12 text-white'>Hadi Başla</motion.button>
            </div>


        </div>

    </div>
  )
}

export default index
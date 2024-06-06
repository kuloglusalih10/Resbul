import React from 'react'
import { useToken } from '../../stores/auth/hooks'
import { decodeToken } from 'react-jwt'
import Lottie from "lottie-react";
import authentication from "../../assets/authentication.json"


const index = ({children}) => {

    const token = decodeToken(useToken());

    return token.isAdmin == 0 ?

    (
        children
    )

    :

    (
        <div className='w-full h-full flex flex-col items-center justify-center'>
        
            <Lottie animationData={authentication}/>
            <h2 className='text-[25px] poppins-semibold mt-8 text-dark-gray/80'>Yekisiz erişim !</h2>
        </div>
    )
}

export default index
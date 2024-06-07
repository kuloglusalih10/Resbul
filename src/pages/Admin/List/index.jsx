import React, { useEffect, useState } from 'react'
import getCompanies from '../../../services/admin/get-companies'
import { toast } from 'react-toastify';
import { decodeToken } from 'react-jwt';
import { CiLocationOn } from "react-icons/ci";
import { FaWifi } from "react-icons/fa6";
import { GiTabletopPlayers } from "react-icons/gi";
import { MdBalcony } from "react-icons/md";
import { IoMdBeer } from "react-icons/io";
import { LuMusic } from "react-icons/lu";
import Lottie from 'lottie-react';
import empty from "../../../assets/empty.json"
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../../../stores/auth/actions';


const index = () => {

    
    
    const [companies, setCompanies] = useState([]);
    const user_id = decodeToken(localStorage.getItem('token')).user_id;
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const token = localStorage.getItem('token');


    const navigate = useNavigate();

    useEffect(()=>{

        const _getCompanies = async () => {

            setIsLoading(true);
            setIsError(false);

            const result = await getCompanies(user_id, token);

            if(result.res){

                setCompanies(result.data);
            }
            else{

                if(!result.isLogged){

                    toast("Önce giriş yapmalısınız", {type: 'error'});
                    navigate('/login');
                    setLogout();

                }else{

                    setIsError(true);
                    toast(result.message, {type: 'error'});
                }
            }

            setIsLoading(false);
        }   

        _getCompanies();

    },[]);

    return (
        <div className='w-full h-full px-8 md:px-52 pt-24 flex flex-col items-center justify-center'>
            {
                isLoading ? 

                <>
                    <div className='w-full p-3 h-[200px] mb-5 animate-pulse'>
                        
                    </div>
                </> 

                :


                isError ? 

                    <>
                        <div>
                            <h2 className='w-full h-[200px] flex items-center justify-center rounded-md border  border-dark-red bg-ligth-red/40'>
                                Bir hata oluştu
                            </h2>
                        </div>
                    </>

                    :

                    <>
                        {
                            companies.length > 0 ?

                                companies.map((item)=>{
                                    return (
                                        <div onClick={()=> navigate(`/admin/${item.id}`) } className='w-full cursor-pointer p-3 h-[200px] mb-5 bg-white border border-ligth-gray/20 rounded-md flex flex-row items-center'>

                                            <div className='h-full bg-main p-2 rounded-md w-1/4'>

                                                <img className='w-full h-full object-fit bg-main rounded-md' src={import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+item.logo} alt="İşletme logo" />

                                            </div>
                                            <div className='mx-6 pt-1 flex flex-1 h-full flex-col justify-start items-start'>

                                                <div className='flex w-full h-1/5 bg-balac flex-row items-center justify-between'>
                                                    <h2 className=' text-xl roboto-regular '>
                                                        {item.name}
                                                    </h2>
                                                    <div className='flex items-center'>

                                                        <CiLocationOn className='mr-3'/>
                                                        <h3 className='text-sm text-ligth-gray'>
                                                            {item.district +" / "+ item.city}
                                                        </h3>

                                                    </div>

                                                </div>

                                                <p className='text-[#656565] pb-3 pt-2 h-1/2 w-full '>
                                                    {item.description.length > 150 ? item.description.slice(0, 150) + "..." : item.description}
                                                </p>
                                                <div className='w-full h-[30%] flex py-2 justify-start gap-x-3 '>

                                                    {item.wifi == 1 && <div className='h-full text-xs gap-x-3 w-1/5 bg-green-100 rounded-md flex items-center justify-center'> <FaWifi color='#19D508' size={19}/> Wifi </div>}
                                                    {item.selfService == 1 && <div className='h-full text-xs gap-x-2 w-1/5 bg-ligth-orange/30 rounded-md flex items-center justify-center'> <GiTabletopPlayers color='#FC6F20' size={19}/> Self Servis </div>}
                                                    {item.balcony == 1 && <div className='h-full text-xs gap-x-3 w-1/5 bg-ligth-purple/40 rounded-md flex items-center justify-center'> <MdBalcony color='#0025FB' size={19}/> Balkon </div>}
                                                    {item.alcohol == 1 && <div className='h-full text-xs gap-x-3 w-1/5 bg-ligth-gray/20 rounded-md flex items-center justify-center'> <IoMdBeer  size={19}/> Alkol </div>}
                                                    {item.liveMusic == 1 && <div className='h-full text-xs gap-x-2 w-1/5 bg-ligth-blue/20 rounded-md flex items-center justify-center'> <LuMusic color='#32ACFF' size={19}/> Canlı müzik </div>}

                                                </div>

                                            </div>
                                            
                                        </div>
                                    )
                                }) 
                            
                            :
                            
                            <div className='w-1/2 h-1/3 flex flex-col items-center justify-center'>
        
                                <Lottie animationData={empty}/>
                                <h2 className='text-[21px] roboto-semibold mt-8 text-dark-gray/80'> Henüz bir işletme eklemediniz </h2>
                            </div>


                        }
                    </>
            }
        </div>
    )
}

export default index;
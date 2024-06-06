import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getCompanyById from '../../../services/general/get-company-byId';
import { toast } from 'react-toastify';
import { decodeToken } from 'react-jwt';
import { useToken } from '../../../stores/auth/hooks'
import { Carousel } from "@material-tailwind/react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { IoStorefrontOutline } from "react-icons/io5";
import { GrContactInfo } from "react-icons/gr";
import { BiFoodMenu } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaWifi } from "react-icons/fa6";
import { GiTabletopPlayers } from "react-icons/gi";
import { MdBalcony } from "react-icons/md";
import { IoMdBeer } from "react-icons/io";
import { LuMusic } from "react-icons/lu";
import { FaBowlFood } from "react-icons/fa6";
import { GiCakeSlice } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { LuSalad } from "react-icons/lu";
import { FaBuildingCircleArrowRight } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import deleteCompany from '../../../services/admin/delete-company';
import { useNavigate } from 'react-router-dom';

const index = () => {

    const {id} = useParams();
    const [company, setCompany] = useState(null);
    const user_id = decodeToken(useToken()).user_id;
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [activeImage, setActiveImage] = useState(false);
    const navigate = useNavigate();


    const handleDelete = async (menu_id, company_id, address_id) => {

        const result = await  deleteCompany(menu_id ,company_id, address_id);

        if(result.res){

            toast("Silme işlemi başarılı", {type : 'success'});
            navigate('/admin/');
        }
        else{
            toast(result.message, {type: 'error'});
        }
    }


    useEffect(()=>{

        

        const getCompany = async () => {

            setIsLoading(true);
            setIsError(false);

            const result = await getCompanyById(id);

            if(result.res){

                setActiveImage(import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+result.data.gallery[0].image)
                setCompany(result.data);

            }
            else {

                setIsError(true);
                toast(result.message, {type : 'error'});

            }

            setIsLoading(false);

        }

        getCompany();

    },[]);
    

    return (
       <div className='w-full h-max  px-8 md:px-52 pt-16 flex flex-col items-center justify-center'>
            {
                isLoading ? 

                <>
                    <div className='w-full p-3 h-[200px] mb-5 animate-pulse'>
                        
                    </div>
                </> 

                :


                isError ? 

                    <>
                        <div className='w-full'>
                            <h2 className='w-full h-[200px] flex items-center justify-center rounded-md border  border-dark-red bg-ligth-red/40'>
                                Bir hata oluştu
                            </h2>
                        </div>
                    </>

                    :

                    <>
                        {
                            
                            <div className='flex flex-col w-full h-full items-center justify-center'>

                               <Carousel autoplay loop >


                                    {
                                        company.gallery.map((item, index) => (

                                            <div key={index} className=''>
                                                <img
                                                onClick={() => setActiveImage(import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+item.image)}
                                                src={import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+item.image}
                                                className="h-[380px] w-full  cursor-pointer rounded-lg object-fit"
                                                alt="gallery-image"
                                                />
                                            </div>
                                        ))
                                    }

                               </Carousel>
                               
                               <Tabs   className={"w-full mt-8"}>
                                    <TabList className={"w-full flex bg-white border rounded-t-md  border-ligth-gray/20 "}>
                                        <Tab  selectedClassName='bg-dark-blue text-white rounded-tl-md' className="w-full cursor-pointer outline-none py-3 flex items-center gap-x-4 justify-center "><IoStorefrontOutline size={23}/> Genel</Tab>
                                        <Tab selectedClassName='bg-dark-blue text-white ' className="w-full outline-none cursor-pointer py-3 flex items-center gap-x-4 justify-center "><GrContactInfo size={23}/> İletişim</Tab>
                                        <Tab selectedClassName='bg-dark-blue text-white rounded-tr-md' className="w-full cursor-pointer outline-none py-3 flex items-center gap-x-4 justify-center "><BiFoodMenu size={23}/> Menü</Tab>
                                        
                                    </TabList>



                                    <TabPanel  className="w-full">
                                        
                                        <div  className='w-full cursor-pointer p-3 h-max bg-white border border-ligth-gray/20 rounded-b-md flex flex-row items-start'>

                                            <div className='h-[200px] bg-main p-2 rounded-md w-1/4'>

                                                <img className='w-full h-full object-fit bg-' src={import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+company.company.logo} alt="İşletme logo" />

                                            </div>
                                            <div className='mx-6 pt-1 flex flex-1 min-h-[200px] flex-col justify-between items-start'>

                                                <div className=''>

                                                    <div className='flex w-full bg-balac flex-row items-center justify-between'>
                                                        <h2 className=' text-xl roboto-regular gap-x-3 flex items-center justify-start'>
                                                            {company.company.name}<span className='text-xs flex items-center gap-x-1 text-ligth-gray'><IoIosPeople size={16}/>{company.company.capacity}</span>
                                                        </h2>
                                                        <div className='flex items-center'>

                                                            <CiLocationOn className='mr-3'/>
                                                            <h3 className='text-sm text-ligth-gray'>
                                                                {company.company.district +" / "+ company.company.city}
                                                            </h3>

                                                        </div>

                                                    </div>

                                                    <p className='text-[#656565] pb-3 pt-2 h-1/2 w-full '>
                                                        {company.company.description}
                                                    </p>

                                                </div>
                                                <div className='w-full flex py-2 justify-start gap-x-3 '>

                                                    {company.company.wifi == 1 && <div className='h-full py-2 text-xs gap-x-3 w-1/5 bg-green-100 rounded-md flex items-center justify-center'> <FaWifi color='#19D508' size={19}/> Wifi </div>}
                                                    {company.company.selfService == 1 && <div className='h-full py-2 text-xs gap-x-2 w-1/5 bg-ligth-orange/30 rounded-md flex items-center justify-center'> <GiTabletopPlayers color='#FC6F20' size={19}/> Self Servis </div>}
                                                    {company.company.balcony == 1 && <div className='h-full py-2 text-xs gap-x-3 w-1/5 bg-ligth-purple/40 rounded-md flex items-center justify-center'> <MdBalcony color='#0025FB' size={19}/> Balkon </div>}
                                                    {company.company.alcohol == 1 && <div className='h-full py-2 text-xs gap-x-3 w-1/5 bg-ligth-gray/20 rounded-md flex items-center justify-center'> <IoMdBeer  size={19}/> Alkol </div>}
                                                    {company.company.liveMusic == 1 && <div className='h-full py-2 text-xs gap-x-2 w-1/5 bg-ligth-blue/20 rounded-md flex items-center justify-center'> <LuMusic color='#32ACFF' size={19}/> Canlı müzik </div>}

                                                </div>

                                            </div>

                                        </div>
                                    </TabPanel>

                                    <TabPanel  className="w-full bg-white border-x border-b  border-ligth-gray/20 rounded-b-md">
                                        <div  className='w-full cursor-pointer p-3 h-max  bg-white border border-ligth-gray/20 rounded-b-md flex flex-col items-start'>
                                            <div className='flex items-center py-2'>

                                                <CiLocationOn className='mr-3' size={18}/>
                                                <h3 className='text-sm text-ligth-gray'>
                                                    {company.company.district +" / "+ company.company.city}
                                                </h3>

                                            </div>

                                            <div className='mt-4 pl-1 text-sm flex flex-row gap-x-3 items-center text-ligth-gray'>
                                                <FaBuildingCircleArrowRight size={21}/>
                                                {company.company.address_desc}
                                            </div>

                                            <div className='w-full h-[1px] my-5 bg-ligth-gray/30'/>

                                            <div className='w-full h-[345px] flex flex-col items-start justify-start  bg-white border border-ligth-gray/20 rounded-md'>
    

                                                <div className='w-full rounded-lg h-2/5 relative'>
                            
                        
                                                    <img className='w-full h-full object-cover rounded-t-lg' src={import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+company.company.user_back}  alt="profile background" />
                                                    
                                                </div>
                                                <div className='h-3/5 w-full flex flex-row  items-end '>
                            
                                                    <div className='w-[30%] h-[207px] flex flex-col items-end justify-center relative'>
                            
                                                    
                                                   
                                                            
                                                        <div className='w-[80%] select-none h-full absolute -top-1/3 left-[30px]  border rounded-lg overflow-hidden'>
                                                                <img className='w-full  h-full object-contain bg-white' src={import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+company.company.user_profile}  alt="Admin profile image" />
                                                        </div>
                                                        
                            
                                                        <h2 className='bottom-4 w-full select-none flex items-center justify-center absolute  poppins-medium text-dark-gray/70 text-[20px]'>
                                                            {company.company.user_name+"  "}{company.company.user_surname}
                                                        </h2>
                            
                                                    </div>
                            
                                                    <div className='flex-1 h-full pb-5 pt-2  pr-4'>

                                                         <div className='h-1/4 text-xs gap-x-2 w-max px-4 bg-ligth-blue/20 rounded-md flex items-center justify-start border border-dark-blue'> <MdOutlineMailOutline color='#32ACFF' size={19}/> {company.company.user_email } </div>

                            
                                                        <div className='w-full pt-4 pb-1 h-[80%]'>
                            
                                                            <textarea readOnly={true}  className='w-full  resize-none outline-none h-full' value={company.company.user_desc} name="" id="" ></textarea>
                            
                                                        </div>
                                                        
                                                    </div>
                                                    
                                                    
                            
                                                </div>

                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel  >
                                        
                                        <div className='w-full bg-white h-full pb-4 border border-ligth-gray/20 rounded-md flex flex-col items-center '>

        

                                            <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-blue/20 rounded-lg mr-4 p-2 border border-dark-blue'><FaBowlFood color='#32ACFF'/> </div> Ana yemekler</h2>
                                                
                                                {
                                                    company.menu.map((item,index)=>{

                                                        if(item.cate_id == '1')
                                                        {
                                                            return(

                                                                <div className='flex w-full mb-4 flex-row items-center justify-between border-b border-ligth-gray/40'>

                                                                    <p className='roboto-regular-italic'>{item.name}</p>

                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>

                                                                </div>
                                                            )

                                                        }
                                                    })
                                                }
                                                
                                                
                                            </div>
                                            <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-purple/60 rounded-lg mr-4 p-2 border border-dark-purple'><GiCakeSlice color='#0025FB'/> </div> Tatlılar</h2>
                                                
                                                {
                                                    company.menu.map((item,index)=>{

                                                        if(item.cate_id == '2')
                                                        {
                                                            return(

                                                                <div className='flex w-full flex-row items-center justify-between border-b border-ligth-gray/40'>

                                                                    <p className='roboto-regular-italic'>{item.name}</p>

                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>

                                                                </div>
                                                            )

                                                        }
                                                    })
                                                }
                                                
                                                

                                                
                                            </div>
                                            <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-green/20 rounded-lg mr-4 p-2 border border-dark-green'><RiDrinks2Fill color='#19D508'/> </div> İçecekler</h2>
                                                
                                                {
                                                    company.menu.map((item,index)=>{

                                                        if(item.cate_id == '3')
                                                        {
                                                            return(

                                                                <div className='flex w-full flex-row items-center justify-between border-b border-ligth-gray/40'>

                                                                    <p className='roboto-regular-italic'>{item.name}</p>

                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>

                                                                </div>
                                                            )

                                                        }
                                                    })
                                                }
                                                
                                                

                                                
                                            </div>
                                            <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-gray/20 rounded-lg mr-4 p-2 border border-dark-gray'><LuSalad color='#1c1e23'/> </div> Aperatifler</h2>
                                                
                                                {
                                                    company.menu.map((item,index)=>{

                                                        if(item.cate_id == '4')
                                                        {
                                                            return(

                                                                <div className='flex w-full flex-row items-center justify-between border-b border-ligth-gray/40'>

                                                                    <p className='roboto-regular-italic'>{item.name}</p>

                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>

                                                                </div>
                                                            )

                                                        }
                                                    })
                                                }
                                                
                                                

                                                
                                            </div>


                                        </div>
                                        
                                    </TabPanel>
                                </Tabs>

                                <div className='w-full flex items-center justify-end gap-x-4 mt-4'>

                                    <button onClick={()=> navigate('edit')} className='w-max py-2 px-16 h-full bg-zinc-100 roboto-regular border border-ligth-gray/20 text-black rounded-md '> Düzenle</button>
                                    <button onClick={()=> handleDelete(company.menu[0].menu_id, company.company.id, company.company.address_id)} className='w-max py-2 px-16 h-full bg-dark-red/90 roboto-regular rounded-md text-white'> Sil</button>
                                </div>
                                


                                
                            </div>

                        }
                    </>
            }
        </div>
    )
}

export default index
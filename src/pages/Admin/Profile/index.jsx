import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../stores/auth/hooks'
import { FaIdCard } from "react-icons/fa";
import { GiFamilyTree } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaKey , FaEdit} from "react-icons/fa";
import {ScaleLoader} from "react-spinners";
import { Dialog } from '@material-tailwind/react';
import classNames from 'classnames';
import resetPassword from '../../../services/auth/reset-password';
import {toast} from "react-toastify"
import logout from '../../../services/auth/logout';
import { setLogout } from '../../../stores/auth/actions';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { htmlToText } from 'html-to-text';

const index = () => {
 

    const user = JSON.parse(useAuth());

    const [name, setName] = useState(user['name'].charAt(0).toUpperCase()+ user['name'].slice(1));
    const [surname, setSurname] = useState(user['surname'].charAt(0).toUpperCase()+ user['surname'].slice(1));
    const [description, setDescription] = useState(user['description'].charAt(0).toUpperCase()+ user['description'].slice(1))
    const [loader, setLoader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const navigate = useNavigate();

    console.log(user);

    const handleResetPass = async (resetMail) => {

        setOpenModal(false);
        

        const result = await resetPassword(resetMail);

        if(result.res){
            toast(result.message,{'type': 'success'})
        }
        else{
            toast(result.message,{'type': 'error'})
        }

            
        
    }

    const handleLogout = async () => {

        setLogoutModal(false);

        const result = await logout();

        if(result.res){

            setLogout();
            toast(result.message,{'type': 'success'});
            navigate('/login');
            
        }
        else{
            toast(result.message,{'type': 'error'})
        }

    }


    return (

        <div className='w-full h-full '>
            <div className=' w-full h-full flex flex-row items-start pt-10 gap-x-8  '>

                
                <Dialog style={{background: 'none', display:'flex', alignItems:'center', justifyContent: 'center', outline: 'none', border: 'none', boxShadow: 'none'}} open={loader}>
                    <ScaleLoader className='' color='white'  />
                </Dialog>

                <div className='w-[70%] h-[345px] flex flex-col items-start justify-start  bg-white border border-ligth-gray/20 rounded-md'>

                    <Dialog  style={{zIndex: 100}} open={openModal} >
                        <div className='border border-ligth-gray/20 bg-main rounded-md p-5 flex items-start w-full justify-center flex-col'>
                            <h2 className='poppins-medium  text-[20px] text-dark-gray '> Şifre sıfırlama maili gönderilsinmi ?</h2>

                            <div className='h-[1px] w-full my-4 bg-ligth-gray/40'></div>

                            <div className='flex flex-row items-center w-full gap-x-4  justify-between'>

                                <button className={classNames('mt-6 select-none hover:bg-main bg-white outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold border border-ligth-gray/20')} onClick={()=> setOpenModal(false)}  type="button">Vazgeç</button>
                                <button className={classNames('mt-6 select-none hover:bg-dark-orange/[95%] bg-dark-orange outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold  text-white ')} onClick={()=> handleResetPass(user['email']) } type="button">Gönder</button>

                            </div>
                        </div>
                    </Dialog>

                    <Dialog  style={{zIndex: 100}} open={logoutModal} >
                        <div className='border border-ligth-gray/20 bg-main rounded-md p-5 flex items-start w-full justify-center flex-col'>
                            <h2 className='poppins-medium  text-[20px] text-dark-gray '> Çıkış Yap ?</h2>

                            <div className='h-[1px] w-full my-4 bg-ligth-gray/40'></div>

                            <div className='flex flex-row items-center w-full gap-x-4  justify-between'>

                                <button className={classNames('mt-6 select-none hover:bg-main bg-white outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold border border-ligth-gray/20')} onClick={()=> setLogoutModal(false)}  type="button">Vazgeç</button>
                                <button className={classNames('mt-6 select-none hover:bg-dark-red bg-dark-red/90 outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold  text-white ')} onClick={()=> handleLogout() } type="button">Evet</button>

                            </div>
                        </div>
                    </Dialog>
                    

                    <div className='w-full rounded-lg h-2/5 relative'>

                        <button className='p-2 rounded-full absolute bottom-4 right-4 flex items-center justify-center bg-dark-orange'>

                            <FaEdit size={15} className='' color='#fff'/>

                        </button>
                        <img className='w-full h-full object-cover rounded-t-lg' src="https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg" alt="profile background" />

                    </div>
                    <div className='h-3/5 w-full flex flex-row  items-end '>

                        <div className='w-[30%] h-[207px] flex flex-col items-end justify-center relative'>

                           
                           <button className='absolute z-50 top-24 left-[75%] rounded-full bg-dark-orange p-2'>
                                <FaEdit className='' color='#fff'/>

                           </button>
                                
                            <div className='w-[80%] select-none h-full absolute -top-1/3 left-[30px]  border rounded-lg overflow-hidden'>

                                    
                                    <img className='w-full  h-full object-contain bg-white' src={user['image']} alt="Admin profile image" >

                                    </img>
                                
                            </div>
                            

                            

                            <h2 className='bottom-4 w-full select-none flex items-center justify-center absolute  poppins-medium text-dark-gray/70 text-[20px]'>
                                {user['name'].charAt(0).toUpperCase()+ user['name'].slice(1)+"  "}{user['surname'].charAt(0).toUpperCase()+ user['surname'].slice(1)}
                            </h2>

                        </div>

                        <div className='flex-1 h-full pb-5 pr-4'>

                            <div className='w-full pt-4 pb-1 h-[80%]'>

                                <textarea  className='w-full resize-none outline-none h-full' value={description} name="" id="" ></textarea>

                            </div>
                            <div className='h-[20%] flex justify-end'>
                                <button onClick={()=> setLogoutModal(true)} className='w-[130px] h-full bg-dark-red/90 rounded-md text-white'> Çıkış Yap</button>

                            </div>

                        </div>
                        
                        

                    </div>

                    

                </div>

                <div className=' w-[30%] h-[345px] rounded-md bg-white border py-4 flex flex-col  gap-y-3 border-ligth-gray/20'>

                    <div className='w-full h-1/5 flex flex-row items-start justify-between'>

                        <div className='px-2 py-1 w-full h-full rounded-md'>
                            <div className='w-full  relative border rounded-md border-ligth-gray/40  h-full flex flex-row items-center '>
                                <div className='p-2.5 rounded-full  absolute right-4 flex items-center justify-center bg-ligth-red/40'>

                                    <FaIdCard size={15} className='' color='#FD0F0F'/>

                                </div>
                                <input onChange={(e)=> setName(e.target.value)} className='w-full focus:border-dark-blue h-full outline-none px-4 pr-[20%] text-[14px] rounded-md' type="text" value={name}/>

                            </div>
                        </div>

                    </div>
                    <div className='w-full h-1/5 flex  flex-row items-start justify-between'>

                        <div className='px-2 py-1 w-full h-full rounded-md'>
                            <div className='w-full relative border rounded-md border-ligth-gray/40  h-full flex flex-row items-center '>

                                <div className='p-2.5 rounded-full  absolute right-4 flex items-center justify-center bg-ligth-gray/20'>

                                    <GiFamilyTree size={15} className='' color='#000'/>

                                </div>
                                <input onChange={(e)=> setSurname(e.target.value)} className='w-full focus:border-dark-blue h-full pr-[20%] outline-none px-4 text-[14px] rounded-md' type="text" value={surname}/>

                            </div>
                        </div>

                    </div>
                    <div className='w-full h-1/5 flex flex-row items-start justify-between'>

                        <div className='px-2 py-1 w-full h-full rounded-md'>
                            <div className='w-full relative border rounded-md border-ligth-gray/40  h-full flex flex-row items-center '>

                                <div className='p-2.5 rounded-full  absolute right-4 flex items-center justify-center bg-ligth-green/40'>

                                    <MdEmail size={15} className='' color='#19D508'/>

                                </div>
                                <input readOnly className='w-full cursor-default pr-[20%] h-full outline-none px-4 text-[14px] rounded-md' type="text" value={user['email'].charAt(0).toUpperCase()+ user['email'].slice(1)}/>

                            </div>
                        </div>

                    </div>
                    <div className='w-full h-1/5 flex  flex-row items-start justify-between'>

                        <div className='px-2 py-1 w-full h-full rounded-md'>
                            <div className='w-full select-none relative border rounded-md border-ligth-gray/40  h-full flex flex-row items-center '>

                                <div className='p-2.5 rounded-full  absolute right-4 flex items-center justify-center bg-ligth-purple/40'>

                                    <FaKey size={15} className='' color='#0025FB'/>

                                </div>
                                <input readOnly className='w-full  pr-[20%] h-full outline-none cursor-default select-none px-4 rounded-md' type="password" value={'123456'}/>

                            </div>
                        </div>

                    </div>

                    <div className='w-full flex-1 px-2 flex items-center justify-between'>
                        <button onClick={()=> setOpenModal(true)} className=' pl-2 text-dark-blue text-[12px]'>Şifre Sıfırla ?</button>
                        <button className='border border-dark-orange bg-ligth-orange/20 rounded-md py-2 px-12'>
                            Kaydet
                        </button>
                    </div>
                </div>
                
            </div>
            <div className='w-full h-max mt-10 '>
                <CKEditor 

                    editor={ClassicEditor} 
                    config={{initialData: description , image: false, link: false, }}
                    onChange={(_, editor) => {
                        const data = editor.getData()
                        setDescription(htmlToText(data,{wordwrap: false }))
                    }}
                    
                    
                />
            </div>

        </div>
    )
}

export default index
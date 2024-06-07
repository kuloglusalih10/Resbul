import React, { useEffect, useState } from 'react'
import { FaIdCard } from "react-icons/fa";
import { GiFamilyTree } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaKey , FaEdit} from "react-icons/fa";
import {ScaleLoader} from "react-spinners";
import { Dialog } from '@material-tailwind/react';
import classNames from 'classnames';
import resetPassword from '../../../services/auth/reset-password';
import {toast} from "react-toastify"
import { setLogout } from '../../../stores/auth/actions';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { htmlToText } from 'html-to-text';
import updateAdminProfile from "../../../services/auth/update-admin-profile";
import { decodeToken, isExpired } from 'react-jwt';
import getUserById from '../../../services/auth/get-user-byId';
import { setToken } from '../../../stores/auth/actions';


const index = () => {
 
    const navigate = useNavigate();



    const [user, setUser] = useState(null);
    const [name, setName] = useState(null);
    const [surname, setSurname] = useState(null);
    const [email, setEmail] = useState(null);
    const [description, setDescription] = useState(null)
    const [loader, setLoader] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);

    const [profile, setProfile] = useState(null);
    const [background, setBackground] = useState(null);
    const [displayProfile, setDisplayProfile] = useState(null);
    const [displayBack, setDisplayBack] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('token'));
    const decodedToken = decodeToken(token);
    


    useEffect(()=>{

        

        const getUser =  async () => {

            const result = await getUserById(decodedToken.user_id);

            if(result.res){

                const user = result.data;
                setUser(user);
                setName(user['name'].charAt(0).toUpperCase()+ user['name'].slice(1));
                setSurname(user['surname'].charAt(0).toUpperCase()+ user['surname'].slice(1));
                setEmail(user['email']);
                setDescription(user['description'].charAt(0).toUpperCase()+ user['description'].slice(1));
                setDisplayProfile(import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+user['profile']);
                setDisplayBack(import.meta.env.VITE_BACKEND_URL+"/img/uploads/"+user['background'])
                

            }
            else{
                toast('Bir sorun oluştu');
                setLogout();
                navigate('login');
            }

        }

        getUser();
    },[])




    const onProfileChange = (event) => {
     
        if (event["target"]["files"] && event["target"]["files"][0]) {


            let file =  event['target']['files'][0];
       
            setProfile(file);
            setDisplayProfile(URL.createObjectURL(file));
   
           }
     
    }

    const onBackgroundChange = (event) => {
       
        if (event["target"]["files"] && event["target"]["files"][0]) {


         let file =  event['target']['files'][0];
    
         setBackground(file);
         setDisplayBack(URL.createObjectURL(file));

        }


    }


    const handleSave = async () => {


        const values = {
            'id' : decodedToken.user_id,
            'name' : name,
            'surname' : surname,
            'description' : description,
            'profile' : profile,
            'background' : background
        }

        
        const result = await updateAdminProfile(values);

        console.log(result);
        
        if(result.res){
            setToken(result.data.token);
            toast(result.message,{'type': 'success'})
        }
         else{
             toast(result.message,{'type': 'error'});
             if(!result.isLogged){
                 navigate('/login');
                 setLogout();
             }
         }
    }

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

        setLogout();
        toast("Çıkış işlemi başarılı",{'type': 'success'});
        navigate('/login');

        

    }


    {
        return user == null ? <div>Yükleniyor</div> 
        
        
            : 



        (
    
           
    
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
                                    <button className={classNames('mt-6 select-none hover:bg-dark-orange/[95%] bg-dark-orange outline-none rounded-md cursor-pointer py-2.5 w-full poppins-semibold  text-white ')} onClick={()=> handleResetPass(email) } type="button">Gönder</button>
    
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
    
                            <button onClick={()=>{document.getElementById('background_input').click();}}  className='p-2  absolute bottom-4 right-4 flex items-center justify-center'>
    
                                <FaEdit size={19} className='' color='#FC6F20'/>
                                <input id='background_input' className='hidden'  type="file"  onChange={onBackgroundChange} />
    
                            </button>
                            <img className='w-full h-full object-cover rounded-t-lg' src={displayBack}  alt="profile background" />
                            
                        </div>
                        <div className='h-3/5 w-full flex flex-row  items-end '>
    
                            <div className='w-[30%] h-[207px] flex flex-col items-end justify-center relative'>
    
                               
                               <button onClick={()=>{document.getElementById('profil_input').click();}} className='absolute z-50 top-[50%] left-[78%] rounded-fullp-2'>
                                    <FaEdit className='' color='#FC6F20'/>
                                    <input className='hidden' id='profil_input'  type="file" onChange={onProfileChange}/>
                               </button>
                                    
                                <div className='w-[80%] select-none h-full absolute -top-1/3 left-[30px]  border rounded-lg overflow-hidden'>
                                        <img className='w-full  h-full object-contain bg-white' src={displayProfile}  alt="Admin profile image" />
                                </div>
                                
    
                                <h2 className='bottom-4 w-full select-none flex items-center justify-center absolute  poppins-medium text-dark-gray/70 text-[20px]'>
                                    {name+"  "}{surname}
                                </h2>
    
                            </div>
    
                            <div className='flex-1 h-full pb-5 pr-4'>
    
                                <div className='w-full pt-4 pb-1 h-[80%]'>
    
                                    <textarea  className='w-full resize-none outline-none h-full' value={description} name="" id="" ></textarea>
    
                                </div>
                                <div  className='h-[20%] flex justify-end'>
                                    <button onClick={()=> setLogoutModal(true)} className='w-[130px] h-full bg-dark-red/90 rounded-md text-white'> Çıkış Yap</button>
    
                                </div>
    
                            </div>
                            
                            
    
                        </div>
    
                        
    
                    </div>
    
                    <div className='shadow shadow-dark-blue/30 w-[30%] h-[345px] rounded-md bg-white border py-4 flex flex-col  gap-y-3 border-ligth-gray/20'>
    
                        <div className='w-full h-1/5 flex flex-row items-start justify-between'>
    
                            <div className='px-2 py-1.5 w-full h-full rounded-md'>
                                <div className='w-full  relative border rounded-md border-ligth-gray/40  h-full flex flex-row items-center '>
                                    <div className='w-[20%] h-full border-r border-ligth-gray/20  absolute left-0 flex items-center justify-center bg-ligth-gray/20'>
    
                                        <FaIdCard size={21} className='' color='#000'/>

                                    </div>
                                    <input onChange={(e)=> setName(e.target.value)} className='w-full focus:border-dark-blue h-full outline-none px-4 pl-[23%] text-[14px] rounded-md' type="text" value={name}/>
    
                                </div>
                            </div>
    
                        </div>
                        <div className='w-full h-1/5 flex  flex-row items-start justify-between'>
    
                            <div className='px-2 py-1.5 w-full h-full rounded-md'>
                                <div className='w-full relative border rounded-md border-ligth-gray/40  h-full flex flex-row items-center '>
    
                                    <div className='w-[20%] h-full border-r border-ligth-gray/20  absolute left-0 flex items-center justify-center bg-ligth-gray/20'>
    
                                        <GiFamilyTree size={21} className='' color='#000'/>
    
                                    </div>
                                    <input onChange={(e)=> setSurname(e.target.value)} className='w-full focus:border-dark-blue h-full pl-[23%] outline-none px-4 text-[14px] rounded-md' type="text" value={surname}/>
    
                                </div>
                            </div>
    
                        </div>
                        <div className='w-full h-1/5 flex flex-row items-start justify-between'>
    
                            <div className='px-2 py-1.5 w-full h-full rounded-md'>
                                <div className='w-full relative border rounded-md border-ligth-gray/40  h-full flex flex-row items-center '>
    
                                    <div className='w-[20%] h-full border-r border-ligth-gray/20  absolute left-0 flex items-center justify-center bg-ligth-gray/20'>
    
                                        <MdEmail size={21} className='' color='#000'/>
    
                                    </div>
                                    <input readOnly className='w-full cursor-default pl-[23%]  h-full outline-none px-4 text-[14px] rounded-md' type="text" value={email}/>
    
                                </div>
                            </div>
    
                        </div>
                        <div className='w-full h-1/5 flex  flex-row items-start justify-between'>
    
                            <div className='px-2 py-1.5 w-full h-full rounded-md'>
                                <div className='w-full select-none relative border rounded-md border-ligth-gray/40  h-full flex flex-row items-center '>
    
                                    <div className='w-[20%] h-full border-r border-ligth-gray/20  absolute left-0 flex items-center justify-center bg-ligth-gray/20'>
    
                                        <FaKey size={20} className='' color='#000'/>
    
                                    </div>
                                    <input readOnly className='w-full  pl-[23%] h-full outline-none cursor-default select-none px-4 rounded-md' type="password" value={'123456'}/>
    
                                </div>
                            </div>
    
                        </div>
    
                        <div className='w-full flex-1 px-2 flex items-center justify-between'>
                            <button onClick={()=> setOpenModal(true)} className=' pl-2 text-dark-blue text-[12px]'>Şifre Sıfırla ?</button>
                            <button onClick={()=> handleSave()}  className={classNames('border border-dark-orange bg-ligth-orange/20 rounded-md py-2 px-12', {'bg-ligth-gray/30 pointer-events-none  border-ligth-gray':(user['name'].toLowerCase() == name.toLowerCase() && user['surname'].toLowerCase() == surname.toLowerCase() && user['description'].toLowerCase() == description.toLowerCase() && displayBack  == null && displayProfile == null)})}>
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
}

export default index
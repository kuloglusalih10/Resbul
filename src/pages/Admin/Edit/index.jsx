import { Field ,ErrorMessage, Form, Formik, FieldArray} from 'formik'
import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { editCompValidation } from '../../../validations/admin/edit-company'
import { FaBowlFood } from "react-icons/fa6";
import { GiCakeSlice } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { LuSalad } from "react-icons/lu";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { Checkbox, menu } from "@material-tailwind/react";
import getCities from '../../../services/admin/get-cities';
import getDistricts from '../../../services/admin/get-districts';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { decodeToken } from 'react-jwt';
import getCompanyById from '../../../services/general/get-company-byId';
import { MdDelete } from "react-icons/md";
import updateCompany from '../../../services/admin/update-company';
import { toast } from 'react-toastify';


const index = () => {

    const {id} = useParams();
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [parent, enableAnimations] = useAutoAnimate();
    const user_id = decodeToken(localStorage.getItem('token')).user_id;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [company, setCompany] = useState(null);
    const [menuError, setMenuError] = useState('');
    const [active, setActive] = useState(null);


    useEffect(()=>{

        

        const getCompany = async () => {

            setIsLoading(true);
            setIsError(false);

            const result = await getCompanyById(id);

            if(result.res){

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

    useEffect(()=>{

        const _getCities = async ()=> {

            const res = await getCities('provinces?fields=name,areaCode,id');
    
            setCities(res);

        }

        _getCities();

    },[])

    return (

        <div className='w-full  flex flex-col items-center justify-center'>

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
                        
                        <Formik
                            
                            validationSchema={editCompValidation}
                            initialValues={{

                                name: company.company.name,
                                oldLogo: company.company.logo,
                                logo : null,
                                description: company.company.description,
                                capacity: company.company.capacity,
                                selfService : company.company.selfService == 1 || company.company.selfService == 'on' ? true  : false,
                                wifi : company.company.wifi == 1 || company.company.wifi == 'on' ? true  : false,
                                liveMusic: company.company.liveMusic == 1 || company.company.liveMusic == 'on' ? true  : false,
                                alcohol : company.company.alcohol == 1 || company.company.alcohol == 'on' ? true  : false,
                                balcony : company.company.balcony == 1 || company.company.balcony == 'on' ? true  : false,


                                city: company.company.city,
                                district: company.company.district,
                                adressDesc: company.company.address_desc,

                                menu : company.menu,
                                food : '',
                                category: '1',
                                price: 0,
                            


                                gallery : null


                            }}

                            onSubmit={async (values, actions)=> {

                                console.log(values);

                                  const result = await updateCompany(values, user_id, company.company.address_id, company.company.id,company.company.menu_id);

                                

                                  if(result.res){
                                      toast(result.message, {type : 'success'});
                                      navigate('/admin/');

                                  }else{

                                     toast(result.message, {type : 'error'});

                                  }

                            }}
                        
                        
                        >

                            {
                                ({values, setFieldValue, isValid, dirty, handleChange, setFieldTouched})=>{

                                    const handleLogoChange = (e) => {
                                        setFieldTouched('logo', true);
                                        setFieldValue('logo', e.target.files[0]);
                                        
                                    };

                                    const handleAddFood = () => {

                                        if(values.food.length < 2){
                                            setMenuError('Yiyecek ismi en az 2 karakter olmalı ');
                                            return

                                        }else if(values.price < 1 ){
                                            setMenuError('Fiyat en az 1 ₺ olmalı ');
                                            return
                                        }
                                        else{
                                            let menuItem = {

                                                'food' : values.food,
                                                'category' : values.category,
                                                'price' : values.price

                                            }
                                            setFieldValue('menu', [...values.menu, menuItem]);
                                            setMenuError('');
                                            setFieldValue('food', '');
                                            setFieldValue('price', 0);
                                            setFieldValue('category', '1');

                                            document.getElementById('food').value='';
                                            document.getElementById('price').value=0;
                                        }
                                    }
                
                                    const onCityChange = async (city) => {
                
                                        setFieldValue('city', city );
                                        const districts = await getDistricts(city);
                                        setDistricts(districts);
                                        
                                    };

                                    const handleMenuDelete = (id) => {
                                        let newMenu = values.menu.filter(item => item.id !== id);
                                        setFieldValue('menu',newMenu);
                                    }
                
                                    const handleGallerySelect = (e) => {
                
                                        const files = e.target.files;
                
                                        let selected_f = [];
                
                                        for (const key in files) {
                                            if(files[key] instanceof File){
                
                                                selected_f.push(files[key]);
                
                                            }
                                        }
                
                                        setFieldTouched('gallery', true);
                                        setActive(URL.createObjectURL(selected_f[0]));
                                        setFieldValue('gallery', selected_f);
                
                                    }
                
                                    return (

                                        <Form className='w-full flex flex-col pt-16 items-center'>
                                            <div className='w-2/3'>

                                                <div className='w-full'>

                                                    <Field   className="w-full rounded border border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue" name="name" placeHolder="İsim"/>
                                                    <ErrorMessage name='name' component='small' className='text-sm text-red-600 mt-2 block'/>

                                                </div>
                                                <div>
                                                    
                                                    <button type='button' onClick={()=> {document.getElementById('logo').click()}} className='w-full mt-4 border border-dark-blue rounded-md bg-ligth-blue/20 py-3 flex flex-row items-center justify-center'><MdOutlineAddPhotoAlternate size={21} className='mr-4'/> Logo</button>
                                                    <Field value={undefined} id='logo' name='logo'  placeHolder="Logo" type='file'  onChange={handleLogoChange} className="w-full hidden rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  />
                                                    <ErrorMessage name='logo'  component='small' className='text-sm text-red-600 mt-2 block'/>
                                                </div>
                                                <div>
                                                    <Field component='textarea'  placeHolder="Açıklama"  className="w-full h-[100px] resize-none rounded border mt-4  border-ligth-gray/20 py-3 px-4 outline-none focus:border-dark-blue"  name='description'/>
                                                    <ErrorMessage name='description' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                </div>
                                                <div className='mt-4'>
                                                    <label className='mt-8 pl-2 text-dark-gray/50'>Kapasite</label>
                                                    <Field placeHolder="Kapasite" type='number' className="w-full resize-none rounded border mt-2 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  name='capacity'/>
                                                    <ErrorMessage name='capacity' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                </div>
                                                
                                                <div className='flex mt-4 flex-row items-center justify-between'>
                                                    <div>
                                                        <Checkbox checked={values.wifi ? true : false} color='green' label='Wifi' name='wifi' onChange={handleChange}/>
                                                        <ErrorMessage  name='wifi' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                    </div>
                                                    <div>
                                                        <Checkbox checked={values.selfService  ? true : false}   color='green'  label='Self Servis' name='selfService' onChange={handleChange}/>
                                                        <ErrorMessage  name='selfService' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                    </div>
                                                    <div>
                                                        <Checkbox  checked={values.liveMusic ? true : false}  color='green'  label='Canlı Müzik' name='liveMusic' onChange={handleChange}/>
                                                        <ErrorMessage  name='liveMusic' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                    </div>
                                                    <div>
                                                        <Checkbox checked={values.alcohol == 1 ? true : false}   color='green'  label='Alkol' name='alcohol' onChange={handleChange}/>
                                                        <ErrorMessage  name='alcohol' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                    </div>
                                                    <div>
                                                        
                                                        <Checkbox checked={values.balcony == 1  ? true : false}  color='green'   label='Dış Mekan' name='balcony' onChange={handleChange}/>
                                                        <ErrorMessage  name='balcony' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                    </div>
                                                </div>
                                                <div className='w-full mt-4'>

                                                    <Field component='select' name='city' onChange={(e) => onCityChange(e.target.value)}   className="w-full rounded border border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue">
                                                        {
                                                            cities.map((city,index)=> <Field key={index} component='option' value={city.name}>{city.name}</Field>)
                                                        }
                                                    </Field>
                                                    <ErrorMessage name='city' component='small' className='text-sm text-red-600 mt-2 block'/>


                                                </div>
                                                <div className='w-full'>

                                                    <Field  component='select' onChange={handleChange} name='district'  className="w-full mt-4 rounded border border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue" p>
                                                        {
                                                            districts.map((district,index)=> <Field key={index} component='option' value={district.name}>{district.name}</Field>)
                                                        }
                                                    </Field>
                                                    <ErrorMessage name='district' component='small' className='text-sm text-red-600 mt-2 block'/>

                                                </div>

                                                <div>
                                                    <Field component='textarea' name='adressDesc'  placeHolder="Adres Açıklaması..."  className="w-full h-[100px] resize-none rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  />
                                                    <ErrorMessage name='adressDesc' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                </div>

                                                <FieldArray

                                                        name='menu'
                                                        render={ ()=> {


                                                            return (

                                                                <>
                                                                
                                                                    <div className='w-full bg-white h-[300px] border border-ligth-gray/20 rounded-md flex flex-col items-center overflow-scroll'>

                                                                        <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                                            <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-blue/20 rounded-lg mr-4 p-2 border border-dark-blue'><FaBowlFood color='#32ACFF'/> </div> Ana yemekler</h2>
                                                                            
                                                                            {
                                                                                values.menu.map((item,index)=>{

                                                                                    if(item.cate_id == '1' || item.category == '1')
                                                                                    {
                                                                                        return(

                                                                                            <div className='flex pl-12  w-full gap-x-4 flex-row items-center'>

                                                                                                <button type='button' onClick={()=> handleMenuDelete(item.id)} className='w-[38px] h-[36px] bg-red-200 border border-red-600 rounded-md flex items-center justify-center'>

                                                                                                    <MdDelete color='#FD0F0F'/>
                                                                                                </button>

                                                                                                <div className='flex w-full mb-4 flex-row items-center justify-between border-b border-ligth-gray/40'>

                                                                                                    <p className='roboto-regular-italic'>{item.name ?? item.food}</p>

                                                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>

                                                                                                </div>
                                                                                            </div>

                                                                                        )

                                                                                    }
                                                                                })
                                                                            }
                                                                            
                                                                            

                                                                            
                                                                        </div>
                                                                        <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                                            <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-purple/60 rounded-lg mr-4 p-2 border border-dark-purple'><GiCakeSlice color='#0025FB'/> </div> Tatlılar</h2>
                                                                            
                                                                            {
                                                                                values.menu.map((item,index)=>{

                                                                                    if(item.cate_id == '2' || item.category == '2')
                                                                                    {
                                                                                        return(

                                                                                            <div className='flex pl-12  w-full gap-x-4 flex-row items-center'>

                                                                                                <button type='button' onClick={()=> handleMenuDelete(item.id)} className='w-[38px] h-[36px] bg-red-200 border border-red-600 rounded-md flex items-center justify-center'>

                                                                                                    <MdDelete color='#FD0F0F'/>
                                                                                                </button>

                                                                                                <div className='flex w-full mb-4 flex-row items-center justify-between border-b border-ligth-gray/40'>

                                                                                                    <p className='roboto-regular-italic'>{item.name ?? item.food}</p>

                                                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>

                                                                                                </div>
                                                                                            </div>
                                                                                        )

                                                                                    }
                                                                                })
                                                                            }
                                                                            
                                                                            

                                                                            
                                                                        </div>
                                                                        <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                                            <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-green/20 rounded-lg mr-4 p-2 border border-dark-green'><RiDrinks2Fill color='#19D508'/> </div> İçecekler</h2>
                                                                            
                                                                            {
                                                                                values.menu.map((item,index)=>{

                                                                                    if(item.cate_id == '3' || item.category == '3')
                                                                                    {
                                                                                        return(

                                                                                            <div className='flex pl-12 w-full gap-x-4 flex-row items-center'>

                                                                                                <button type='button' onClick={()=> handleMenuDelete(item.id)} className='w-[38px] h-[36px] bg-red-200 border border-red-600 rounded-md flex items-center justify-center'>

                                                                                                    <MdDelete color='#FD0F0F'/>
                                                                                                </button>

                                                                                                <div className='flex w-full mb-4 flex-row items-center justify-between border-b border-ligth-gray/40'>

                                                                                                    <p className='roboto-regular-italic'>{item.name ?? item.food}</p>

                                                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>

                                                                                                </div>
                                                                                            </div>
                                                                                        )

                                                                                    }
                                                                                })
                                                                            }
                                                                            
                                                                            

                                                                            
                                                                        </div>
                                                                        <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                                            <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-gray/20 rounded-lg mr-4 p-2 border border-dark-gray'><LuSalad color='#1c1e23'/> </div> Aperatifler</h2>
                                                                            
                                                                            {
                                                                                values.menu.map((item,index)=>{

                                                                                    if(item.cate_id == '4' || item.category == '4')
                                                                                    {
                                                                                        return(

                                                                                            <div className='flex pl-12  w-full gap-x-4 flex-row items-center'>

                                                                                                <button type='button' onClick={()=> handleMenuDelete(item.id)} className='w-[38px] h-[36px] bg-red-200 border border-red-600 rounded-md flex items-center justify-center'>

                                                                                                    <MdDelete color='#FD0F0F'/>
                                                                                                </button>

                                                                                                <div className='flex w-full mb-4 flex-row items-center justify-between border-b border-ligth-gray/40'>

                                                                                                    <p className='roboto-regular-italic'>{item.name ?? item.food}</p>

                                                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>

                                                                                                </div>
                                                                                            </div>
                                                                                        )

                                                                                    }
                                                                                })
                                                                            }
                                                                            
                                                                            

                                                                            
                                                                        </div>


                                                                    </div>
                                                                    <ErrorMessage  name='menu' component='small' className='text-sm text-red-600 mt-2 block'/>

                                                        

                                                                    <div className='flex flex-col items-start justify-between'>

                                                                        

                                                                        <div className='w-full'>
                                                                            <Field  name='food' id='food' onChange={handleChange}  placeHolder="İsim"  className="w-full  resize-none rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  />
                                                                        
                                                                        </div>
                                                                        {
                                                                            menuError && (<p className='text-red-600 text-xs mt-2 '>{menuError}</p>)
                                                                        }
                                                                        <div className='w-full gap-x-2  flex items-center justify-between'>
                                                                            <div className='w-1/3'>

                                                                                <Field component='select' onChange={handleChange} name='category'  className="w-full mt-4 rounded border border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue" p>
                                                                                    
                                                                                        <Field component='option' value={1}>Ana yemek</Field>
                                                                                        <Field  component='option' value={2}>Tatlı</Field>
                                                                                        <Field component='option' value={3}>İçecek</Field>
                                                                                        <Field  component='option' value={4}>Aperatif</Field>

                                                                                    
                                                                                </Field>

                                                                            </div>
                                                                            <div className='w-1/3'>
                                                                                <Field type='number' id='price' onChange={handleChange} className="w-full resize-none rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  name='price'/>
                                                                                
                                                                            </div>
                                                                            <div className='w-1/3'>
                                                                                    <button type='button' onClick={handleAddFood} className='w-full mt-4 border border-dark-blue rounded-md bg-ligth-blue/20 py-2 flex flex-row items-center justify-center'><IoMdAdd size={21} className='mr-2'/> Ekle</button>
                                                                                    
                                                                                
                                                                            </div>

                                                                        </div>

                                                                    </div>

                                                                </>
    
                                                            )
                                                        }}

                                                />

                                                <>
                                                    {
                                                        values.gallery == null ? (<>
                                                        
                                                            <div className='w-full border mt-6 border-dark-blue bg-dark-blue/30 rounded-md flex flex-col items-center justify-center h-[280px]'>
                                                                <div>
                                                                    <MdOutlineAddPhotoAlternate color='#32ACFF' size={40} />
                                                                </div>
                                                                <h2 className='poppins-regular-italic mt-8 text-[17px]'>
                                                                    Lütfen en az 3 en fazla 5 fotoğraf yükleyiniz
                                                                </h2>
                                                            </div>
                                                        
                                                        </>) : (<>
                                                        
                                                        
                                                            <div className="grid gap-4 mt-6">
                                                                <div>
                                                                    <img
                                                                    className=" w-full max-w-full rounded-lg object-cover object-center h-[200px]"
                                                                    src={active}
                                                                    alt=""
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-5 gap-4">
                                                                    {values.gallery.map((item, index) => (
                                                                    <div key={index}>
                                                                        <img
                                                                        onClick={() => setActive(URL.createObjectURL(item))}
                                                                        src={URL.createObjectURL(item)}
                                                                        className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                                        alt="gallery-image"
                                                                        />
                                                                    </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        
                                                        </>)
                                                    }

                                                    <div className='w-full gap-x-4 flex items-center justify-between'>
                                                        <div className='w-full flex flex-col items-center'>

                                                            <button type='button' onClick={()=> {document.getElementById('gallery').click()}} className='w-full mt-4 border border-dark-orange rounded-md bg-ligth-orange/20 py-3 flex flex-row items-center justify-center'><MdOutlineAddPhotoAlternate size={21} className='mr-4'/> Galeriye ekle</button>

                                                            <Field multiple="multiple" value={undefined} name='gallery' id='gallery'  placeHolder="Galeri" type='file'  onChange={handleGallerySelect} className="w-full hidden rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  />
                                                            <ErrorMessage name='gallery' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                        </div>

                                                    </div>
                                                    
                                                
                                                </>
                                            
                                        

                                            </div>

                                            <div className='w-2/3 mt-6 flex items-center justify-end'>
                                                <button disabled={!isValid || !dirty} className='border disabled:bg-ligth-gray disabled:border-black border-ligth-gray/20 py-2.5 px-16 rounded-md bg-orange-500 text-white'>Kaydet</button>
                                            </div>
                                        </Form>

                                    )
                                }
                            }
                        </Formik>

                    </>
            }


            
        </div>

    )
}

export default index
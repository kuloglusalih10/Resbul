import React,{useState, useCallback, useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { stepperValidation } from '../../../validations/admin/stepper-form';
import classNames from 'classnames';
import { IoStorefront,IoLocation } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { BiFoodMenu } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { Checkbox, menu } from "@material-tailwind/react";
import getCities from '../../../services/admin/get-cities';
import getDistricts from '../../../services/admin/get-districts';
import { FaBowlFood } from "react-icons/fa6";
import { GiCakeSlice } from "react-icons/gi";
import { RiDrinks2Fill } from "react-icons/ri";
import { LuSalad } from "react-icons/lu";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import addCompany from '../../../services/admin/add-new-company';
import { toast } from 'react-toastify';
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';


const index = () => {

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [parent, enableAnimations] = useAutoAnimate();
    const user_id = decodeToken(localStorage.getItem('token')).user_id;
    const navigate = useNavigate();
   

    const [menuError, setMenuError] = useState('');
     
      const [active, setActive] = useState(null);
    

    useEffect(()=>{

        const _getCities = async ()=> {

            const res = await getCities('provinces?fields=name,areaCode,id');
    
            setCities(res);

        }

        _getCities();

    },[])


  return (
    <div className='flex items-start justify-center pt-28'>

        

        <Formik
        
            validationSchema={stepperValidation}
            initialValues={{

                step: 1,
                lastStep : 4,

                // step 1

                name: '',
                logo : null,
                capacity: 0,
                selfService : false,
                wifi : false,
                liveMusic: false,
                alcohol : false,
                balcony : false,

                // step 2

                city: '',
                district: '',
                adressDesc: '',


                // step 3

                menu : [],
                food : '',
                category: '1',
                price: 0,

                // step 4 

                gallery : []


            }}

            onSubmit={async (values, actions)=> {

                const result = await addCompany(values, user_id);

                

                if(result.res){

                    toast(result.message, {type : 'success'});
                    navigate('/admin/');

                }else{

                    toast(result.message, {type : 'error'});

                }

            }}

        
        >
            

            {
                ({values, setFieldValue, isValid, dirty, handleChange, setFieldTouched}) => {

                    const steps =  [

                        {
                            step: 1,
                            title : "Hakkında",
                            icon : <IoStorefront size={23} color={1 <= values.step ? '#19D508' : '#959292'}/>
                        },
                        {
                            step : 2,
                            title : "Adres",
                            icon: <IoLocation size={23} color={2 <= values.step ? '#19D508' : '#959292'}/>
                        },
                        {
                            step : 3,
                            title : "Menü",
                            icon : <BiFoodMenu size={23} color={3 <= values.step ? '#19D508' : '#959292'}/>
                        },
                        {
                            step : 4,
                            title: "Galeri",
                            icon : <GrGallery size={21} color={4 <= values.step ? '#19D508' : '#959292'}/>
                        }
                    ]

                    const handlePrev = (e) =>  {
                        setFieldValue('step' , values.step - 1)
                    }

                    const handleNext = (e) => {
                        console.log(values);
                        setFieldValue('step' , values.step + 1);

                    }

                    const handleStep = (step) => {
                        setFieldValue('step', step);
                    }

                    const handleLogoChange = (e) => {
                        setFieldTouched('logo', true);
                        setFieldValue('logo', e.target.files[0]);
                        
                    };

                    const onCityChange = async (city) => {

                        setFieldValue('city', city );
                        const districts = await getDistricts(city);
                        setDistricts(districts);
                        
                    };

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

                        <Form ref={parent} className='w-full md:w-[60%] bg-white border border-ligth-gray/20 rounded-md p-10'>


                            <header className='mb-4 px-4 w-full border border-ligth-gray/20 bg-main rounded-md flex h-[120px] items-center justify-around'>

                                {
                                    steps.map( step => (

                                        <>
                                            <button  onClick={()=> handleStep(step.step)} disabled={values.step < step.step} type='button' className={classNames('flex h-min w-1/5 flex-col px-2 items-center justify-center')}>
                                                <span className={classNames('rounded-full w-[45px] p-2 h-[45px] flex items-center justify-center',{

                                                    'bg-green-100 border border-dark-green': values.step >= step.step, 
                                                    'bg-zinc-200' : values.step < step.step,


                                                } )}>
                                                {

                                                    step.step < values.step  ?  
                                                    
                                                        <FaCheck color='#19D508'/>
                                                    
                                                    :

                                                        step.icon
                                                        
        
                                                }
                                                </span>
                                                
                                                <h2 className={classNames('mt-3 roboto-regular', {'text-dark-gray/60' : values.step < step.step})}>
                                                    {
                                                        step.title
                                                    }
                                                </h2>
                                            </button>

                                            {
                                                step.step != values.lastStep && ( <div className='w-[60%] mx-4 h-[1px] bg-ligth-gray/20'/>)
                                            }

                                            
                                        
                                        
                                        </>

                                    ))
                                }
                            </header>

                            {
                                values.step === 1 && (

                                    <>
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
                                            <Field component='textarea'  placeHolder="Açıklama"  className="w-full h-[100px] resize-none rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  name='description'/>
                                            <ErrorMessage name='description' component='small' className='text-sm text-red-600 mt-2 block'/>
                                        </div>
                                        <div className='mt-4'>
                                            <label className='mt-8 pl-2 text-dark-gray/50'>Kapasite</label>
                                            <Field placeHolder="Kapasite" type='number' className="w-full resize-none rounded border mt-2 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  name='capacity'/>
                                            <ErrorMessage name='capacity' component='small' className='text-sm text-red-600 mt-2 block'/>
                                        </div>
                                        
                                        <div className='flex mt-4 flex-row items-center justify-between'>
                                            <div>
                                                <Checkbox  color='green' label='Wifi' name='wifi' onChange={handleChange}/>
                                                <ErrorMessage  name='wifi' component='small' className='text-sm text-red-600 mt-2 block'/>
                                            </div>
                                            <div>
                                                <Checkbox color='green'  label='Self Servis' name='selfService' onChange={handleChange}/>
                                                <ErrorMessage  name='selfService' component='small' className='text-sm text-red-600 mt-2 block'/>
                                            </div>
                                            <div>
                                                <Checkbox color='green'  label='Canlı Müzik' name='liveMusic' onChange={handleChange}/>
                                                <ErrorMessage  name='liveMusic' component='small' className='text-sm text-red-600 mt-2 block'/>
                                            </div>
                                            <div>
                                                <Checkbox color='green'  label='Alkol' name='alcohol' onChange={handleChange}/>
                                                <ErrorMessage  name='alcohol' component='small' className='text-sm text-red-600 mt-2 block'/>
                                            </div>
                                            <div>
                                                
                                                <Checkbox color='green'   label='Dış Mekan' name='balcony' onChange={handleChange}/>
                                                <ErrorMessage  name='balcony' component='small' className='text-sm text-red-600 mt-2 block'/>
                                            </div>
                                        </div>
                                    </>

                                )
                            }

                            {
                                values.step === 2 && (

                                    <>
                                        <div className='w-full'>

                                            <Field component='select' name='city' onChange={(e) => onCityChange(e.target.value)}   className="w-full rounded border border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue">
                                                {
                                                     cities.map((city,index)=> <Field key={index} component='option' value={city.name}>{city.name}</Field>)
                                                }
                                            </Field>
                                            <ErrorMessage name='city' component='small' className='text-sm text-red-600 mt-2 block'/>


                                        </div>
                                        <div className='w-full'>

                                            <Field component='select' onChange={handleChange} name='district'  className="w-full mt-4 rounded border border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue" p>
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

                                    </>
                                    
                                    
                                    
                                )
                            }

                            {
                                values.step === 3 && (
                                    <>
                                        <FieldArray
                                        
                                            name='menu'
                                            render={(arrayHelper)=>{

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
                                                        console.log(values.menu);
                                                    }
                                                }
                                                
                                            
                                                return (
                                            
                                                    <>

                                                        <div className='w-full h-[300px] border border-ligth-gray/20 rounded-md flex flex-col items-center overflow-scroll'>

                                                            {
                                                                menuError && (<p className='text-red-600 mt-2'>{menuError}</p>)
                                                            }

                                                            <div className='px-4 mt-4 w-full flex flex-col items-start'>

                                                                <h2 className='text-dark-gray/80 mb-4 roboto-medium text-[17px] flex flex-row items-center '> <div className='bg-ligth-blue/20 rounded-lg mr-4 p-2 border border-dark-blue'><FaBowlFood color='#32ACFF'/> </div> Ana yemekler</h2>
                                                                
                                                                {
                                                                    values.menu.map((item,index)=>{

                                                                        if(item.category == '1')
                                                                        {
                                                                            return(
    
                                                                                <div className='flex w-full mb-4 flex-row items-center justify-between border-b border-ligth-gray/40'>
    
                                                                                    <p className='roboto-regular-italic'>{item.food}</p>
    
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
                                                                    values.menu.map((item,index)=>{

                                                                        if(item.category == '2')
                                                                        {
                                                                            return(
    
                                                                                <div className='flex w-full flex-row items-center justify-between border-b border-ligth-gray/40'>
    
                                                                                    <p className='roboto-regular-italic'>{item.food}</p>
    
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
                                                                    values.menu.map((item,index)=>{

                                                                        if(item.category == '3')
                                                                        {
                                                                            return(
    
                                                                                <div className='flex w-full flex-row items-center justify-between border-b border-ligth-gray/40'>
    
                                                                                    <p className='roboto-regular-italic'>{item.food}</p>
    
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
                                                                    values.menu.map((item,index)=>{

                                                                        if(item.category == '4')
                                                                        {
                                                                            return(
    
                                                                                <div className='flex w-full flex-row items-center justify-between border-b border-ligth-gray/40'>
    
                                                                                    <p className='roboto-regular-italic'>{item.food}</p>
    
                                                                                    <h2 className='mt-4 roboto-regular text-dark-orange text-[15px]'> {item.price} ₺</h2>
    
                                                                                </div>
                                                                            )

                                                                        }
                                                                    })
                                                                }
                                                                
                                                                

                                                                
                                                            </div>


                                                        </div>

                                            

                                                        <div className='flex flex-col items-center justify-between'>

                                                            

                                                            <div className='w-full'>
                                                                <Field  name='food' id='food' onChange={handleChange}  placeHolder="İsim"  className="w-full  resize-none rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  />
                                                            
                                                            </div>
                                                            <div className='w-full gap-x-2 flex items-center justify-between'>
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
                                            
                                            
                                            
                                                )}}
                                        
                                        
                                        />

                                    </>
                                )
                            }

                            {
                                values.step === 4 && (
                                    <>
                                        {
                                            values.gallery.length < 3 ? (<>
                                            
                                                <div className='w-full border border-dark-blue bg-dark-blue/30 rounded-md flex flex-col items-center justify-center h-[280px]'>
                                                    <div>
                                                        <MdOutlineAddPhotoAlternate color='#32ACFF' size={40} />
                                                    </div>
                                                    <h2 className='poppins-regular-italic mt-8 text-[17px]'>
                                                        Lütfen en az 3 en fazla 5 fotoğraf yükleyiniz
                                                    </h2>
                                                </div>
                                            
                                            </>) : (<>
                                            
                                            
                                                <div className="grid gap-4">
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
                                )
                            }

                            <div className='w-full gap-x-24 mt-10 flex items-center justify-between'>

                                {
                                    values.step > 1 ? (

                                        <button type='button' onClick={handlePrev} className='py-3 flex-1 bg-dark-gray/90 rounded-md text-white'>Geri</button> 
                                    ) 
                                    
                                    : 
                                    
                                    ( <div className='flex-1 w-full'/>)
                                }

                                {
                                    values.lastStep === values.step ?  (

                                        ( <button type='submit' disabled={!isValid || !dirty}  className='py-3 disabled:opacity-50  flex-1 bg-dark-gray/90 rounded-md text-white'>Kaydet</button>
    )
                                        
                                        )
                                        
                                        : 
                                        
                                        <button disabled={!isValid || !dirty} type='button' onClick={handleNext} className='py-3 flex-1 bg-dark-gray/90 disabled:opacity-50 rounded-md text-white'>İleri</button>
                                }

                            
                            </div>

                        </Form>

                    )

                }


                
            }
            
        </Formik>


    </div>
  )
}

export default index
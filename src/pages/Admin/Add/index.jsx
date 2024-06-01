import React,{useState, useCallback, useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import { stepperValidation } from '../../../validations/admin/stepper-form';
import classNames from 'classnames';
import { IoStorefront,IoLocation } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { BiFoodMenu } from "react-icons/bi";
import { GrGallery } from "react-icons/gr";
import { Checkbox } from "@material-tailwind/react";
import getCities from '../../../services/admin/get-cities';
import getDistricts from '../../../services/admin/get-districts';

const index = () => {

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);

    const [foodError, setfoodError] = useState('');
    

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
                category: 1,
                price: 0


            }}

            onSubmit={(values, actions)=> {
                console.log(values);
            }}

        
        >
            

            {
                ({values, setFieldValue, isValid, dirty, handleChange, setTouched, setFieldError}) => {

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
                        setFieldValue('logo', e.target.files[0]);
                    };

                    const onCityChange = async (city) => {

                        setFieldValue('city', city );
                        const districts = await getDistricts(city);
                        setDistricts(districts);
                        
                    }

                    return (

                        <Form className='w-full md:w-[60%] bg-white border border-ligth-gray/20 rounded-md p-10'>


                            <header className='mb-4 px-4 w-full border border-ligth-gray/20 bg-main rounded-md flex h-[120px] items-center justify-around'>

                                {
                                    steps.map( step => (

                                        <>
                                            <button  onClick={()=> handleStep(step.step)} disabled={values.step < step.step} type='button' className={classNames('flex h-min w-1/5 flex-col px-2 items-center justify-center')}>
                                                <span className={classNames('rounded-full w-[45px] p-2 h-[45px] flex items-center justify-center',{

                                                    'bg-green-100 border border-dark-green': values.step >= step.step, 
                                                    'bg-zinc-200' : values.step != step.step,


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
                                            <Field value={undefined}  placeHolder="Logo" type='file'  onChange={handleLogoChange} className="w-full rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  name='logo'/>
                                            <ErrorMessage name='logo' component='small' className='text-sm text-red-600 mt-2 block'/>
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
                                                    console.log(values);
                                                }
                                                
                                            
                                                return (
                                            
                                                    <>

                                                        <div className='w-full h-[300px] border border-ligth-gray/20 rounded-md flex flex-col items-center overflow-scroll'>

                                                            {/* <div className='w-[40%] h-[20%] mt-4'>
                                                                <img className='w-full h-full object-contain' src={URL.createObjectURL(values.logo)} alt="" />
                                                            </div> */}

                                                        </div>

                                                        <div className='w-full hidden'>
                                                            <Field  name='menu'  placeHolder="İsim"  className="w-full  resize-none rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  />
                                                            <ErrorMessage name='menu' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                        </div>

                                                        <div className='flex flex-col items-center justify-between'>

                                                            

                                                            <div className='w-full'>
                                                                <Field  name='food'  placeHolder="İsim"  className="w-full  resize-none rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  />
                                                                <ErrorMessage name='food' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                            </div>
                                                            <div className='w-full gap-x-2 flex items-center justify-between'>
                                                                <div className='w-1/3'>

                                                                    <Field component='select' onChange={handleChange} name='category'  className="w-full mt-4 rounded border border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue" p>
                                                                        
                                                                             <Field key={index} component='option' value={1}>Ana yemek</Field>
                                                                             <Field key={index} component='option' value={2}>Tatlı</Field>
                                                                             <Field key={index} component='option' value={3}>İçecek</Field>
                                                                             <Field key={index} component='option' value={4}>Aperatif</Field>

                                                                        
                                                                    </Field>
                                                                    <ErrorMessage name='category' component='small' className='text-sm text-red-600 mt-2 block'/>

                                                                </div>
                                                                <div className='w-1/3'>
                                                                    <Field type='number' className="w-full resize-none rounded border mt-4 border-ligth-gray/20 py-2 px-4 outline-none focus:border-dark-blue"  name='price'/>
                                                                    <ErrorMessage name='price' component='small' className='text-sm text-red-600 mt-2 block'/>
                                                                </div>
                                                                <div className='w-1/3'>

                                                                        <button type='button' onClick={handleAddFood} className='py-2 mt-4 w-full flex-1 bg-dark-gray/90 disabled:opacity-50 rounded-md text-white'>Ekle</button>
                                                                    
                                                                </div>

                                                            </div>


                                                        </div>
                                                    </>
                                            
                                            
                                            
                                                )}}
                                        
                                        
                                        />

                                        

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

                                        ( <button type='submit' className='py-3 flex-1 bg-dark-gray/90 rounded-md text-white'>Kaydet</button>
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
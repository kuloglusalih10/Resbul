import React , {useState}from 'react'
import { Card,  CardHeader, CardBody, Typography,Tabs,TabsHeader,TabsBody,Tab,TabPanel } from "@material-tailwind/react";
import { useFormik } from 'formik';
import { loginSchema } from '../../validations';
import softLogo from "../../assets/soft-logo.png"
import loginForm from "../../assets/login-form.png"


const index = () => {

    const [type, setType] = useState("card");

    const { handleSubmit, handleChange, values, errors ,touched} = useFormik({

        initialValues:{
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: (values)=> console.log(values)

    });

    return (
        <div className='w-full h-full flex flex-row '>

            <div className='w-1/2 h-full flex flex-col items-center justify-center bg-dark-orange'>
                    <div>
                        <img src={loginForm} alt="Login Form Image" />
                    </div>
            </div>

            <div className='bg-main w-1/2 h-full flex flex-col items-center justify-center' style={{}}>

                <div className='w-[100px] h-[100px] mb-32'>

                    <img className='w-full h-full object-contain' src={softLogo} alt="Resbul Logo" />

                </div>

                
                <Card className="w-full max-w-[35rem] shadow-none border border-ligth-gray/20">
            
                    <CardBody>
                        <Tabs value={type} className="overflow-visible">
                            <TabsHeader className="relative z-0 py-2 bg-ligth-gray/10">
                                <Tab value="card" className='py-2' onClick={() => setType("card")}> Müşteri Giriş  </Tab>
                                <Tab value="paypal" className='py-2' onClick={() => setType("paypal")}> İşletme Giriş </Tab>
                            </TabsHeader>
                            <TabsBody className="!overflow-x-hidden !overflow-y-visible " animate={{
                                initial: {
                                    x: type === "card" ? 400 : -400,
                                },
                                mount: {
                                    x: 0,
                                },
                                unmount: {
                                    x: type === "card" ? 400 : -400,
                                },
                                }}
                            >
                                <TabPanel value="card" className=" px-0">

                                            <form className='flex items-center flex-col justify-center' onSubmit={handleSubmit}>
                                                
                                                <input placeholder='Email' name="email" onChange={handleChange} values={values.email} className="w-full border  border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4" />
                                                {errors.email && touched.email ? ( <div className='text-dark-red w-full '>{errors.email} </div> ) : null}

                                                <input placeholder="Password" onChange={handleChange} values={values.password}  name="password" className="w-full border border-ligth-gray/20 rounded-md outline-none py-2.5 px-2 focus:border-ligth-blue mt-4"/> 
                                                {errors.password && touched.password ? ( <div className='text-dark-red w-full'>{errors.password}</div>) : null}
                                                
                                                <button className='mt-12 bg-dark-orange outline-none rounded-md cursor-pointer py-2.5 w-full text-white' type="submit">Giriş Yap</button>
                                               <div className='w-full mt-8 h-[35px] flex flex-row items-center justify-center'>

                                                    <div className='h-[1px] my-auto bg-ligth-gray/20 flex-1 mt-4'/>
                                                    <p className='mx-4 block text-[12px] text-ligth-gray'>Veya şunun ile devam et </p>
                                                    <div className='h-[1px] my-auto bg-ligth-gray/20 flex-1 mt-4'/>

                                               </div>

                                               <button className='mt-8 bg-white outline-none rounded-md cursor-pointer py-2.5 w-full text-dark-gray border border-ligth-gray' type="submit">Google</button>
                                            </form>
                                        
            
                                </TabPanel>
                                <TabPanel value="paypal" className="p-0">
                                <form className="mt-12 flex flex-col gap-4">
                                    
                                </form>
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </CardBody>
                </Card>

            </div>
        </div>
    )
}

export default index

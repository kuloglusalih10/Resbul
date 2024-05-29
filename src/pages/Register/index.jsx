import React , {memo, useState}from 'react'
import { Card, CardBody,Tabs,TabsHeader,TabsBody,Tab,TabPanel } from "@material-tailwind/react";
import loginFormImage from "../../assets/register-form.png"
import { FaRegUser } from "react-icons/fa";
import formLogoImage from "../../assets/register-form-logo.png"
import { IoStorefrontOutline } from "react-icons/io5";
import Form from './companents/Form'

const index = () => {

    const [type, setType] = useState("customer");
    

    return (
        <div className='w-full h-full flex flex-row '>

            <div className='w-1/2 h-full flex flex-col items-center justify-center bg-dark-blue'>
                    <div>
                        <img src={loginFormImage} alt="Login Form Image" />
                    </div>
            </div>

            <div className='bg-main w-1/2 h-full flex flex-col items-center justify-center' style={{}}>

                <div className='w-[250px] h-min '>

                    <img className='w-full h-full object-contain' src={formLogoImage} alt="Resbul Logo" />

                </div>

                <h2 className='poppins-medium text-dark-gray/90 mb-8 mt-12 text-[17px]'>Resbula Hoşgeldiniz. Hemen Kayıt Olun</h2>

                
                <Card className="w-full max-w-[35rem] shadow-none border border-ligth-gray/20 h-max">
            
                    <CardBody className='h-full'>
                        <Tabs value={type} className="overflow-visible h-full">
                            <TabsHeader className="relative z-0 py-2 bg-ligth-gray/10 border-[1px] border-ligth-gray/20">
                                <Tab value="customer" className='py-2 poppins-medium text-[15px] text-dark-gray '  onClick={() => setType("customer")}> <FaRegUser className='inline mr-4' size={21}/> Müşteri Kayıt  </Tab>
                                <Tab value="company" className='py-2 poppins-medium text-[15px] text-dark-gray' onClick={() => setType("company")}> <IoStorefrontOutline className='inline mr-4' size={22}/> İşletme Kayıt </Tab>
                            </TabsHeader>
                            <TabsBody className="!overflow-x-hidden !overflow-y-visible h-full" animate={{
                                initial: {
                                    x: type === "customer" ? 400 : -400,
                                },
                                mount: {
                                    x: 0,
                                },
                                unmount: {
                                    x: type === "customer" ? 400 : -400,
                                },
                                }}
                            >
                                <TabPanel value="customer" className="h-full px-0">
                                    <Form isAdmin={0}/>
                                </TabPanel>
                                <TabPanel value="company" className="px-0 h-full">
                                    <Form isAdmin={1}/>
                                </TabPanel>
                            </TabsBody>
                        </Tabs>
                    </CardBody>
                </Card>

            </div>
        </div>
    )
}

export default memo(index)




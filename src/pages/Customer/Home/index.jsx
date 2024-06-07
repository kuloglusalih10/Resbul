import React from 'react'
import { Tooltip } from '@material-tailwind/react'
import TurkeyMap from 'turkey-map-react'
import { useNavigate } from 'react-router-dom'
import logo from "../../../assets/login-form-logo.png"


  const index = () => {

  const navigation = useNavigate();

    const renderCity = (cityComponent, cityData) => ( 
        <Tooltip content={cityData.name} key={cityData.id}> 
            {cityComponent} 
        </Tooltip>
    );


    return (
      <div >

          <div className='w-full flex items-center justify-center'>
              <div className='flex flex-col items-center justify-center mt-20'>

                  <div className='w-[180px] h-max '>
                      <img src={logo} className='w-full h-full object-content' alt="" />
                  </div>

                  <h2 className='text-dark-gray/80 roboto-bold-italic text-[25px] mt-16'>
                      Bölgenizi seçin ve keşfetmeye başlayın
                  </h2>
              </div>
          </div>
      
          <TurkeyMap onClick={(city)=> navigation(`/customer/${city.name}`)} customStyle={{hoverColor:'#099CFF', idleColor:'#1c1e23'}} cityWrapper={renderCity} hoverable={true} />
      
      
      </div>
    )
}

export default index
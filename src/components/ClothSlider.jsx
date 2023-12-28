import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'; 
import 'swiper/css'; 
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import Head from './Head';
import OpenWeatherDisplay from './OpenWeatherDisplay';


const slider={
    width:"100px",
    height:"100px",
}

const ClothSlider=()=> {

    const [temperature, setTemperature] = useState(null);
    const [folderName , setFolderName] = useState(null)

    
    const getCurrentWeather = (temp) => {
        setTemperature(temp);        
    }
    console.log(temperature);

    const getImageFolder = (temperature)=>{
        if(temperature<=4){
            return '4'
        }
        else if(temperature >=5 && temperature <=8){
            return '5_8'
        }else if(temperature >= 9 && temperature <= 16){
            return '16_9'
        }
        else if(temperature >= 5 && temperature <= 8){
            return '16_9'
        }
        else if(temperature >= 17 && temperature <= 19){
            return '16_9'
        }
        else if(temperature >= 20 && temperature <= 22){
            return '16_9'
        }
        else if(temperature >= 23 && temperature <= 27){
            return '16_9'
        }
        else if(temperature >= 28){
            return '16_9'
        }
        
    }

    useEffect(()=>{
        if(temperature !== null){
            const folder = getImageFolder(temperature)
            setFolderName(folder)
        }
    },[temperature])

    console.log(folderName);

    const items=[
        {src:`../clothicon/${folderName}`}
    ]
    return (
        <>
            <OpenWeatherDisplay propFunction={getCurrentWeather} />
            <Swiper
                style={slider}
                slidesPerView={1}
                loop
                modules={[Autoplay]}
                autoplay={{delay:1000}}
                spped={1000}
    >
      {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={item.src} />
            </SwiperSlide>
          );
        })}
            </Swiper>
        </>
    )
}

export default ClothSlider

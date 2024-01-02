import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'; 
import 'swiper/css'; 
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import OpenWeatherDisplay from './OpenWeatherDisplay';


const slider={
    width:"100px",
    height:"100px",
}

const ClothSlider=()=> {

    const [temperature, setTemperature] = useState(null);
    const [folderName , setFolderName] = useState(null);

    const imageCount = {
        '4' :5,
       '5_8': 4,
       '16_9' : 2,
       '19_17' : 3,
       '20_22' : 3,
       '27_23' :2,
       '28' : 3
       }

    
    const getCurrentWeather = (temp) => {
        setTemperature(temp);        
    }
    // console.log(temperature);

    const getImageFolder = (temperature)=>{
        if(temperature<5){
            return '19_17'
        }
        else if(temperature >=5 && temperature <9){
            return '5_8'
        }else if(temperature >= 9 && temperature < 17){
            return '16_9'
        }
        else if(temperature >= 17 && temperature < 20){
            return '19_17'
        }
        else if(temperature >= 20 && temperature < 23){
            return '20_22'
        }
        else if(temperature >= 23 && temperature < 28){
            return '27_23'
        }
        else if(temperature >= 28){
            return '28'
        }
        
    }

    useEffect(()=>{
        if(temperature !== null){
            const folder = getImageFolder(temperature)
            setFolderName(folder)
        }
    },[temperature])

    const items=[
        {src:`/clothicon/${folderName}`},
        {src:`/clothicon/${folderName}`},
        {src:`/clothicon/${folderName}`},
        {src:`/clothicon/${folderName}`},
        {src:`/clothicon/${folderName}`}
    ]
    
    const imgCountResult = imageCount[folderName];
    console.log(imgCountResult);

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
              <img src={`${item.src}/${idx}.png`} />
            </SwiperSlide>
          );
        })}
        
            </Swiper>
        </>
    )
}

export default ClothSlider

import React, { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'; 
import 'swiper/css'; 
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
import OpenWeatherDisplay from './OpenWeatherDisplay';
import styled from 'styled-components';


const slider={
    width:"100px",
    height:"100px",
}

const ClothSlider=()=> {

    const [temperature, setTemperature] = useState(null);
    const [folderName , setFolderName] = useState(null);
    const [item,setItem]= useState(null);
    const [itemTwo,setItemTwo]=useState(null);
    const [clothMessage,setClothMessage]=useState('');

    const imageCounts = {
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

    const getImageFolder = (temperature)=>{
        if(temperature<5){
            setClothMessage('날씨가 많이 추워요.. 옷을 두껍게 입는걸 추천드릴게요.');
            return '4';
        }
        else if(temperature >=5 && temperature <9){
            setClothMessage('슬슬 보온장비를 챙겨야 할 것 같아요.');
            return '8_5';
        }else if(temperature >= 9 && temperature < 17){
            setClothMessage('사람에 따라 쌀쌀하다고도 느낄 수 있어요.');
            return '16_9';
        }
        else if(temperature >= 17 && temperature < 20){
            setClothMessage('가벼운 긴팔 입기 좋은 날씨에요.');
            return '19_17';
        }
        else if(temperature >= 20 && temperature < 23){
            setClothMessage('아주 온난한 날씨에요.');
            return '20_22';
        }
        else if(temperature >= 23 && temperature < 28){
            setClothMessage('꽤 더우니 시원하게 입고 나가시는게 좋을 것 같아요.');
            return '27_23';
        }
        else if(temperature >= 28){
            setClothMessage('불볕더위에요.. 얇은 옷차림을 추천드려요.');
            return '28';
        }
        
    }

    const messageSetter = (temperature)=>{
        if(temperature<5){
            setClothMessage('날씨가 많이 추워요.. 옷을 두껍게 입는걸 추천드릴게요.');
        }
        else if(temperature >=5 && temperature <9){
            setClothMessage('슬슬 보온장비를 챙겨야 할 것 같아요.');
        }else if(temperature >= 9 && temperature < 17){
            setClothMessage('사람에 따라 쌀쌀하다고도 느낄 수 있어요.');
        }
        else if(temperature >= 17 && temperature < 20){
            setClothMessage('가벼운 긴팔 입기 좋은 날씨에요.');
        }
        else if(temperature >= 20 && temperature < 23){
            setClothMessage('아주 온난한 날씨에요.');
        }
        else if(temperature >= 23 && temperature < 28){
            setClothMessage('꽤 더우니 시원하게 입고 나가시는게 좋을 것 같아요.');
        }
        else if(temperature >= 28){
            setClothMessage('불볕더위에요.. 얇은 옷차림을 추천드려요.');
        }
        
    }

    useEffect(()=>{
        if(temperature !== null){
            const folder = getImageFolder(temperature);
            setFolderName(folder);
            messageSetter(temperature);
        }
    },[temperature])

    useEffect(() => {
        if (folderName !== null) {
            const count = imageCounts[folderName];
            const newItems = [];
            for (let i = 0; i < count+1; i++) {
                newItems.push({ src: `/clothicon/${folderName}/1/${i}.png` });
            }
            setItem(newItems);
        }
    }, [folderName]);

    useEffect(() => {
        if (folderName !== null) {
            const count = imageCounts[folderName];
            const newItems = [];
            for (let i = 0; i < count+1; i++) {
                newItems.push({ src: `/clothicon/${folderName}/2/${i}.png` });
            }
            setItemTwo(newItems);
        }
    }, [folderName]);
    
    console.log(itemTwo)

    return (
        <>
            <OpenWeatherDisplay propFunction={getCurrentWeather} />
            <br/>
            <br/>
            <WeatherRecommend>
                {temperature&&clothMessage}
            </WeatherRecommend>
            <br/>
            <Swiper
                style={slider}
                slidesPerView={2}
                slidesPerGroup={2}
                loop={true}
                modules={[Autoplay]}
                autoplay={{delay:2000}}
                speed={1000}
    >
      {temperature&&item.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={item.src} />
            </SwiperSlide>
            
          );
        })}
        
            </Swiper>

            <Swiper
                style={slider}
                slidesPerView={2}
                slidesPerGroup={2}
                loop={true}
                modules={[Autoplay]}
                autoplay={{delay:2000}}
                speed={1000}
    >
      {temperature&&itemTwo.map((item, idx) => {
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

const WeatherRecommend= styled.span`
    
`

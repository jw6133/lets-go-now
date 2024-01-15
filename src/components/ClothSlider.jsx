import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import OpenWeatherDisplay from './OpenWeatherDisplay';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCloudSunRain } from "react-icons/fa";
import { IoSubway } from "react-icons/io5";
import { TbBusStop } from "react-icons/tb";

const slider = {
    width: "100px",
    height: "50px",
}

const ClothSlider = () => {
    const [weather,setWeather]=useState(null);
    const [temperature, setTemperature] = useState(null);   
    const [clothingData, setClothingData] = useState({ items: [], itemsTwo: [], message: '' });

    const imageCounts = {
        '4': 5,
        '8_5': 5,
        '16_9': 5,
        '19_17': 5,
        '20_22': 5,
        '27_23': 5,
        '28': 5
    }

    const updateClothingData = (temp) => {
        let folderName, message;
        if (temp < 5) {
            message = '날씨가 많이 추워요.. 옷을 두껍게 입는걸 추천드릴게요.';
            folderName = '4';
        }
        // ... other conditions ...
        else if(temperature >=5 && temperature <9){
            message='슬슬 보온장비를 챙겨야 할 것 같아요.';
            folderName='8_5'
        }
        else if(temperature >= 9 && temperature < 17){
            message='사람에 따라 쌀쌀하다고도 느낄 수 있어요.';
            folderName='16_9'
        }
        else if(temperature >= 17 && temperature < 20){
            message='가벼운 긴팔 입기 좋은 날씨에요.';
            folderName='19_17'
        }
        else if(temperature >= 20 && temperature < 23){
            message='아주 온난한 날씨에요.';
            folderName='20_22'
        }
        else if(temperature >= 23 && temperature < 28){
            message='꽤 더우니 시원하게 입고 나가시는게 좋을 것 같아요.';
            folderName='27_23'
        }
        else if (temp >= 28) {
            message = '불볕더위에요.. 얇은 옷차림을 추천드려요.';
            folderName = '28';
        }

        if (folderName) {
            const count = imageCounts[folderName];
            const items = Array.from({ length: count + 1 }, (_, i) => ({ src: `/clothicon/${folderName}/1/${i}.png` }));
            const itemsTwo = Array.from({ length: count + 1 }, (_, i) => ({ src: `/clothicon/${folderName}/2/${i}.png` }));

            setClothingData({ items, itemsTwo, message });
        }
    };

    useEffect(() => {
        if (temperature !== null) {
            updateClothingData(temperature);
        }
    }, [temperature]);


    return (
        <>
            <WeatherBlock>
                <OpenWeatherDisplay propFunction={setTemperature} />
            </WeatherBlock>
            <p>Today Recommend</p>
            <Linky>
                <span><Link to ='/weatherHour'><FaCloudSunRain/></Link></span>
                <span><Link to ='/bus'><TbBusStop/></Link></span>
                <span><Link to ='/subway'><IoSubway/></Link></span>
            </Linky>
            <WeatherRecommend>{clothingData.message}</WeatherRecommend>
            <br />
            <Swiper style={slider} slidesPerView={2}
                slidesPerGroup={2}
                loop={true}
                modules={[Autoplay]}
                autoplay={{ delay: 2000 }}
                speed={1000}
            >
                {clothingData.items.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <img src={item.src} alt={`Clothing item ${idx}`} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper style={slider}
                slidesPerView={2}
                slidesPerGroup={2}
                loop={true}
                modules={[Autoplay]}
                autoplay={{ delay: 2000 }}
                speed={1000}
            >
                {clothingData.itemsTwo.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <img src={item.src} alt={`Clothing item ${idx}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ClothSlider

const WeatherBlock = styled.div`
    color:white;
    display:none;
    align-items:center;
    margin-bottom:10px;
`

const WeatherRecommend = styled.span`
    margin: 5px 0 ;
    word-break:keep-all;
    text-align:center;
    display:flex;
    align-items:center;
`

const Linky=styled.div`
    font-size:50px;
    display:flex;
    justify-content:space-between;
    padding-top:10px;
    margin:0px 15px 10px 15px ;
    span{
        width:55px;
        height: 55px;
        display:flex;
        text-align:center;
        align-items:center;
        justify-content:center;
        border:solid 1px black;
    }
`

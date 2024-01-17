import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//components
import OpenWeatherHour from './OpenWeatherHour';
import OpenWeatherDisplay from './OpenWeatherDisplay';
//icon
import { WiDayCloudy } from "react-icons/wi";
import { IoSubwayOutline } from "react-icons/io5";
import { TbBusStop } from "react-icons/tb";
import { TbShirt } from "react-icons/tb";
import { IoUmbrellaOutline } from "react-icons/io5";

const slider = {
    width: "100px",
    height: "50px",
}

const ClothSlider = () => {
    const [filteredList,setfilteredList]=useState([]);
    const [temperature, setTemperature] = useState(null);   
    const [clothingData, setClothingData] = useState({ items: [], itemsTwo: [], message: '' });
    const [rainy,setRainy] = useState(false);
    const [rainyTime,setRainyTime] = useState(null);
    const [rainyIcon,setRainyIcon] = useState('01d');
    const [rainyTemp,setRainyTemp] = useState(null);

    const rainyWeather = [201, 200, 202, 210, 211, 212, 221, 230, 231, 232, 300, 301, 302, 310, 311, 312, 313, 314, 321,
        500, 501, 502, 503, 504, 511, 520, 521, 522, 531, 600, 601, 602, 611, 612, 615, 616, 620, 621, 622, 901, 906]

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

    useEffect(()=>{
        isRain(filteredList);
    },[filteredList])

    const isRain=(list)=>{
        list.map((el,index)=>{
            console.log(el);
            if(index=0){
                const rainyHour = new Date(el.dt_txt);
                setRainyTime(rainyHour);
                setRainyIcon(el.weather[0].icon);
                setRainyTemp(el.main.temp);
            }
            if(index<=2 && rainyWeather.includes(el.weather[0].id)){
                const rainyHour = new Date(el.dt_txt);
                setRainy(true);
                setRainyTime(rainyHour);
                setRainyIcon(el.weather[0].icon);
                setRainyTemp(el.main.temp);
            }
        })
    }

    const rainText = () =>{
        if(rainy){
            return `${(rainyTime.getHours()).toString().padStart(2,"0")}시에 비나 눈이 올 예정입니다. 우산을 챙겨주세요.`
        }
        else{
            return '오늘은 비가 안오는듯 해요. 우산은 필요없어요 :)'
        }
    }


    return (
        <>
            <WeatherBlock>
                <OpenWeatherHour pFunction={setfilteredList}/>
                <OpenWeatherDisplay propFunction={setTemperature} />
            </WeatherBlock>
            <LinkMenu>Quick Menu</LinkMenu>
            <Linky>
                <span><Link to ='/weatherHour'><WiDayCloudy/></Link></span>
                <span><Link to ='/subway'><IoSubwayOutline/></Link></span>
                <span><Link to ='/bus'><TbBusStop/></Link></span>
            </Linky>
            <MainText><TbShirt/> 복장 추천</MainText>
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

            <MainBody>
            <span className='umbrellaText'><IoUmbrellaOutline/> 우산</span>
                <WeatherRecommend>{rainText()}</WeatherRecommend>
                <WeatherWrapper>
                    <span className='isrs'>눈/비 여부 :</span>
                    <span className='rainYesNo'>{rainy? 'yes':'no'}</span>
                    <span>{rainyTime&&(rainyTime.getHours()).toString().padStart(2,"0")}시</span>
                    <span>{rainyTemp}°C</span>
                    <img src={`http://openweathermap.org/img/w/${rainyIcon}.png`}></img>
                </WeatherWrapper>
            </MainBody>
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
const LinkMenu=styled.div`
    padding-top:5px;
    width:100%;
    text-align:center;
    font-size:24px;
`
const MainText=styled.div`
    width:100%;
    padding-left:10px;
    font-size:24px;
    vertical-align:middle;
`
const WeatherRecommend = styled.span`
    width:100%;
    height:40px;
    margin: 0 auto ;
    word-break:keep-all;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
`

const Linky=styled.div`
    font-size:50px;
    display:flex;
    justify-content:space-between;
    padding:20px 20px 0px 20px;
    margin-bottom:20px;
    border-bottom:solid 1px black;
    span{
        width:55px;
        height: 55px;
        display:flex;
        text-align:center;
        justify-content:center;
        margin:0 auto;
        margin-bottom:10px;
        &:hover{
            box-shadow: 0 0 0 1px black;
            background-color:#79b6c9;
        }
    }
`
const MainBody=styled.div`
    margin-top: 20px;   
    width: 100%;
    span{
        width:100%;
        text-align:center;
    }
    img{
        width: 50px;
        height:50px;
    }
    .umbrellaText{
        font-size:24px;
    }
`
const WeatherWrapper = styled.div`
    font-size:20px;
    border-radius:30px;
    display:flex;
    background-color:#79b6c9;
    color:white;
    padding: 5px 20px;
    margin:10px 0;
    line-height:1.2;
    .isrs{
        font-size:16px;
    }
    .rainYesNo{
        font-size:16px;
        width:40px;
    }
    span{
        width:100px;
        height:60px;
        display:flex;
        align-items:center;
        text-align:center;
        justify-content:center;
        vertical-align:middle;
    }
`

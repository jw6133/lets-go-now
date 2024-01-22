import axios from 'axios';
import React, { useEffect, useState, PropTypes } from 'react'
import styled from 'styled-components';
import { WiDayCloudy } from "react-icons/wi";

function OpenWeatherHour() {
    const [weatherHour,setWeatherHour]=useState(null);
    const [weatherHArray,setWeatherHArray]=useState([]);
    const [filteredList,setFilteredList]=useState([]);
    const [tempSave,setTempSave]=useState(null);
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate()).toString().padStart(2,"0")} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const twoWeatherApi=process.env.REACT_APP_OPENWEATHER_SECOND_API_KEY;

    const weatherDescKo = [
        { 201: '가벼운 비와 천둥' },
        { 200: '비를 동반한 천둥' },
        { 202: '폭우를 동반한 천둥' },
        { 210: '약한 천둥' },
        { 211: '천둥' },
        { 212: '강한 천둥' },
        { 221: '불규칙적 천둥' },
        { 230: '약한 안개와 천둥' },
        { 231: '안개와 천둥' },
        { 232: '강한 안개비와 천둥' },
        { 300: '가벼운 안개비' },
        { 301: '안개비' },
        { 302: '강한 안개비' },
        { 310: '가벼운 적은비' },
        { 311: '적은비' },
        { 312: '강한 적은비' },
        { 313: '소나기와 안개비' },
        { 314: '강한 소나기와 안개비' },
        { 321: '소나기' },
        { 500: '악한 비' },
        { 501: '중간 비' },
        { 502: '강한 비' },
        { 503: '매우 강한 비' },
        { 504: '극심한 비' },
        { 511: '우박' },
        { 520: '약한 소나기' },
        { 521: '소나기' },
        { 522: '강한 소나기' },
        { 531: '불규칙적 소나기' },
        { 600: '가벼운 눈' },
        { 601: '눈' },
        { 602: '강한 눈' },
        { 611: '진눈깨비' },
        { 612: '소나기 진눈깨비' },
        { 615: '약한 비와 눈' },
        { 616: '비와 눈' },
        { 620: '약한 소나기 눈' },
        { 621: '소나기 눈' },
        { 622: '강한 소나기 눈' },
        { 701: '아주 옅은 안개' },
        { 711: '옅은 안개' },
        { 721: '연무' },
        { 731: '모래 먼지' },
        { 741: '안개' },
        { 751: '모래' },
        { 761: '먼지' },
        { 762: '화산재' },
        { 771: '돌풍' },
        { 781: '토네이도' },
        { 800: '맑은 하늘' },
        { 801: '약간 흐린 하늘' },
        { 802: '옅게 흐린 하늘' },
        { 803: '미약하게 흐린 하늘' },
        { 804: '흐린 하늘' },
        { 900: '토네이도' },
        { 901: '태풍' },
        { 902: '허리케인' },
        { 903: '한랭' },
        { 904: '고온' },
        { 905: '바람부는' },
        { 906: '우박' },
        { 951: '미풍' },
        { 952: '약한 바람' },
        { 953: '산들바람' },
        { 954: '바람' },
        { 955: '선선한 바람' },
        { 956: '센 바람' },
        { 957: '약한 돌풍' },
        { 958: '돌풍' },
        { 959: '심각한 돌풍' },
        { 960: '폭풍' },
        { 961: '강한 폭풍' },
        { 962: '허리케인' },
    ]

    //날씨 한글번역
    const korean =(id)=>{
        return weatherDescKo.find((el)=>el[id])[id];
    }
    //시간 분해 (날짜/시간)
    const divideDate=(time)=>{
        const date= new Date(time);
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate()}`;
    }
    const divideTime=(time)=>{
        const date= new Date(time);
        return `${date.getHours()} : ${(date.getMinutes()).toString().padStart(2,"0")}`;
    }


    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          getHourWeather(lat, lon);
        });
      },[]);

    const getHourWeather=async(lat,lon)=>{
        try{
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${twoWeatherApi}&units=metric`);
            setWeatherHour(result.data);
            setWeatherHArray(result.data.list);
        }catch(error){
                console.error(error)
            }
    }

    const getTime=()=>{
        const filteredArray=[]
        {weatherHArray&&weatherHArray.map((el)=>{
                if(el.dt_txt>=formattedDate){
                    if(filteredArray.length<6){
                        filteredArray.push(el);
                    }
                }
        })}
        setFilteredList(filteredArray)
    }

    useEffect(()=>{
        getTime();
    },[weatherHArray])

    // useEffect(() => {
        
    //     if (filteredList.length > 0) {
    //         props.pFunction(filteredList);
    //     }
    // }, [filteredList, props.pFunction]);
    
    
    return (
        <>
        <MainText><WiDayCloudy/> <span>Weather</span></MainText>
            <ul>
                {filteredList&&filteredList.map((el)=>{
                    return(
                        <>
                        <WeatherWrapper>
                            <WeatherDate>
                                <span>{divideDate(el.dt_txt)}</span><br/>
                                <span className='hour'>{divideTime(el.dt_txt)}</span>
                            </WeatherDate>
                            <WeatherTemp>{el.main.temp}°C</WeatherTemp>
                            <Weather>{korean(el.weather[0].id)}</Weather>
                            <WeatherIcon>
                            <img src={`http://openweathermap.org/img/w/${el.weather[0].icon}.png`}></img>
                            </WeatherIcon>
                            <br/>
                        </WeatherWrapper>
                        </>
                    )
                })}
            
        </ul>
        </>
    )
}

export default OpenWeatherHour

const MainText = styled.div`
    width:100%;
    color: white;
    font-size:28px;
    text-align:center;
    padding-top:10px;
    margin-bottom:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    span{
        background-color:#235191;
        margin-left:5px;
    }
`
const WeatherWrapper = styled.li`
    border-radius:30px;
    justify-content:space-between;
    display:flex;
    background-color:#305893;
    color:white;
    padding: 5px 0;
    padding-left:30px;
    margin-bottom:10px;
    gap:15px;
    line-height:1.2;
`
const WeatherDate=styled.div`
    padding-top:10px;
    width:90px;
    height:60px;
    .hour{
        width:90px;
        font-size:24px;
    }
`
const WeatherTemp=styled.div`
    width:90px;
    height:70px;
    text-align:right;
    font-size:24px;
    display:flex;
    align-items:center;
`
const Weather=styled.div`
    width:50px;
    height:70px;
    font-size:16px;
    word-break:keep-all;
    display:flex;
    align-items:center;
`
const WeatherIcon = styled.div`
    width:70px;
    height:70px;
`


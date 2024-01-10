import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OpenWeatherHour() {
    const [weatherHour,setWeatherHour]=useState(null);
    const [weatherHArray,setWeatherHArray]=useState([]);
    const [filteredList,setFilteredList]=useState([]);
    const [tempSave,setTempSave]=useState(null);
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${(today.getDate()).toString().padStart(2,"0")} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    console.log(formattedDate);


    const twoWeatherApi=process.env.REACT_APP_OPENWEATHER_SECOND_API_KEY;

    const weatherDescKo = [
        { 201: '가벼운 비를 동반한 천둥구름' },
        { 200: '비를 동반한 천둥구름' },
        { 202: '폭우를 동반한 천둥구름' },
        { 210: '약한 천둥구름' },
        { 211: '천둥구름' },
        { 212: '강한 천둥구름' },
        { 221: '불규칙적 천둥구름' },
        { 230: '약한 연무를 동반한 천둥구름' },
        { 231: '연무를 동반한 천둥구름' },
        { 232: '강한 안개비를 동반한 천둥구름' },
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
        { 520: '약한 소나기 비' },
        { 521: '소나기 비' },
        { 522: '강한 소나기 비' },
        { 531: '불규칙적 소나기 비' },
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
        { 701: '박무' },
        { 711: '연기' },
        { 721: '연무' },
        { 731: '모래 먼지' },
        { 741: '안개' },
        { 751: '모래' },
        { 761: '먼지' },
        { 762: '화산재' },
        { 771: '돌풍' },
        { 781: '토네이도' },
        { 800: '구름 한 점 없는 맑은 하늘' },
        { 801: '약간의 구름이 낀 하늘' },
        { 802: '드문드문 구름이 낀 하늘' },
        { 803: '구름이 거의 없는 하늘' },
        { 804: '구름으로 뒤덮인 흐린 하늘' },
        { 900: '토네이도' },
        { 901: '태풍' },
        { 902: '허리케인' },
        { 903: '한랭' },
        { 904: '고온' },
        { 905: '바람부는' },
        { 906: '우박' },
        { 951: '바람이 거의 없는' },
        { 952: '약한 바람' },
        { 953: '부드러운 바람' },
        { 954: '중간 세기 바람' },
        { 955: '신선한 바람' },
        { 956: '센 바람' },
        { 957: '돌풍에 가까운 센 바람' },
        { 958: '돌풍' },
        { 959: '심각한 돌풍' },
        { 960: '폭풍' },
        { 961: '강한 폭풍' },
        { 962: '허리케인' },
    ]

    //   console.log(weatherDescKo[803])

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
                    if(filteredArray.length<7){
                        filteredArray.push(el);
                    }
                }
        })}
        setFilteredList(filteredArray)
    }

    useEffect(()=>{
        getTime();
    },[weatherHArray])

    console.log(filteredList)
    
    return (
        <>
            <ul>
                {filteredList&&filteredList.map((el)=>{
                    return(
                        <li>
                            Time : {el.dt_txt} <br/>
                            Temperature : {el.main.temp} <br/>
                            Weather : {el.weather[0].main} <br/><br/>
                        </li>
                    )
                })}
            
        </ul>
        </>
    )
}

export default OpenWeatherHour


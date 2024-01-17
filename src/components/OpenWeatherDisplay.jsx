import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


function OpenWeatherDisplay(props) {

    const [weatherData, setWeatherData] = useState([])
    const [weatherMain,setWeatherMain]=useState([]);

    const openWeatherApi=process.env.REACT_APP_OPENWEATHER_API_KEY;

    // const getIcon=()=>{
    //     let icon;
    //     if(weatherData.weather[0]!==null){
    //         icon = weatherData.weather[0].icon
    //     }
    //     return icon;
    // }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          getWeather(lat, lon);
        });
      },[]);


    const getWeather=async(lat,lon)=>{
        try{
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApi}&units=metric`);
            setWeatherData(result.data)
            setWeatherMain(result.data.main)
        }catch(error){
                console.error(error)
            }
    }

    // props.propFunction(weatherMain);
    useEffect(() => {
        if (weatherMain) {
            props.propFunction(weatherMain);
        }
    }, [weatherMain, props]);

    return (
        <>
        <SimpleWeather>
            {weatherData.name}
            <p></p>
            <span>{weatherMain.temp}°C</span>
            {/* <img src={`http://openweathermap.org/img/w/${getIcon()}.png`}/> */}
        </SimpleWeather>
        </>
    )
}

export default OpenWeatherDisplay 


const SimpleWeather=styled.div`
    position:relative;
    right:0%;
    text-align:right;
    img{
        padding-left:5px;
        display:inline;
        width:25px;
        height:25px;
    }
`

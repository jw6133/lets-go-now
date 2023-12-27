import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


function OpenWeatherDisplay() {

    const [weatherData, setWeatherData] = useState([])
    const [weatherMain,setWeatherMain]=useState([]);

    
    

    
    const openWeatherApi="1e387d50f02e1624f01db6925218db94"


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

    return (

        <SimpleWeather>
            {weatherData.name}
            <p></p>
            <span>{weatherMain.temp}°C</span>
            
            
        
        </SimpleWeather>
    )
}

export default OpenWeatherDisplay
const SimpleWeather=styled.div`
    position:relative;
    right:0%;
    text-align:right;
`

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


function OpenWeatherDisplay() {

    const [weatherData, setWeatherData] = useState([])
    const [lat,setLat]=useState(0)
    const [lon,setLon]=useState(0)

    
    

    

    const openWeatherApi="1e387d50f02e1624f01db6925218db94";
    const city="1835847";

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          getWeather(lat, lon);
        });
      }, []);


    const getWeather=async(lat,lon)=>{
        try{
            const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${openWeatherApi}&units=metric`);
            setWeatherData(result.data);
        }catch(error){
                console.error(error)
            }
    }

    
    const weathermain= weatherData.main;
    console.log(weathermain)
    return (

        <SimpleWeather>
            {weatherData.name}
            <p></p>
            <span>{weathermain.temp}°C</span>
            
        
        </SimpleWeather>
    )
}

export default OpenWeatherDisplay
const SimpleWeather=styled.div`
    position:relative;
    right:0%;
    text-align:right;
`

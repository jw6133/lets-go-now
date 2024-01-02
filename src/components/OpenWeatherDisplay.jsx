import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';


function OpenWeatherDisplay(props) {

    const [weatherData, setWeatherData] = useState([])
    const [weatherMain,setWeatherMain]=useState([]);

    
        
    
    const openWeatherApi=process.env.REACT_APP_OPENWEATHER_API_KEY;
    


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

    props.propFunction(weatherMain.temp);
    

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

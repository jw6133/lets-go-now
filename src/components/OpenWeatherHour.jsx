import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OpenWeatherHour() {
    const [weatherHour,setWeatherHour]=useState(null);

    const twoWeatherApi=process.env.REACT_APP_OPENWEATHER_SECOND_API_KEY;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          getHourWeather(lat, lon);
        });
      },[]);


    const getHourWeather=async(lat,lon)=>{
        try{
            const result = await axios.get(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${twoWeatherApi}`);
            setWeatherHour(result);
        }catch(error){
                console.error(error)
            }
    }

    // console.log(weatherHour);
    return (
        <div>
            aa
        </div>
    )
}

export default OpenWeatherHour

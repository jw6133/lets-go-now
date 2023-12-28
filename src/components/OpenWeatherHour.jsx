import axios from 'axios';
import React, { useEffect, useState } from 'react'

function OpenWeatherHour() {
    const [weatherHour,setWeatherHour]=useState(null);

    const twoWeatherApi="c1a0442808f9041d9d60e0298d249705"

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

    console.log(weatherHour);
    return (
        <div>
            aa
        </div>
    )
}

export default OpenWeatherHour

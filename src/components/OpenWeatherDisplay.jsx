import axios from 'axios';
import React from 'react'
import { json } from 'react-router-dom';

function OpenWeatherDisplay() {

    const openWeatherApi="1e387d50f02e1624f01db6925218db94";
    const city="1835847";
    const lang="kr";
    const api = `https://api.openweathermap.org/data/2.5/weather?id=${city}&appid=${openWeatherApi}`
    
    const result=axios.get(api);
    console.log(result.data);
    return (

        <div>
            weather
        </div>
    )
}

export default OpenWeatherDisplay

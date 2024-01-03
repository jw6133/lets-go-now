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

    // useEffect(()=>{
    //     const filteredArray=[];
    //     if(weatherHArray!==null){
    //         while(cnt<=5){
    //             if(weatherHArray[hArrayIdx].dt_txt>formattedDate){
    //                 filteredArray.push(weatherHArray[hArrayIdx]);
    //                 cnt=cnt+1;
    //                 hArrayIdx=hArrayIdx+1;
    //             }
    //             else{
    //                 hArrayIdx=hArrayIdx+1;
    //             }
    //         }
    //     }
    //     hArrayIdx=0;
    //     setFilteredList(filteredArray);
    // },[weatherHArray])

    console.log(filteredList)
    
    return (
        <>
            <ul>
                {filteredList&&filteredList.map((el)=>{
                    return(
                        <li>
                            {el.dt_txt} {el.main.temp} {el.weather[0].main}    
                        </li>
                    )
                })}
            
        </ul>
        </>
    )
}

export default OpenWeatherHour

import React, { useState } from 'react'
import styled from 'styled-components'
import Subway from '../components/Subway';
import OpenWeatherHour from '../components/OpenWeatherHour';
import ClothSlider from '../components/ClothSlider';
import BusDisplay from '../components/BusDisplay';
import { IoSubway } from "react-icons/io5";
import { FaCloudSunRain } from "react-icons/fa";
import { TbBusStop } from "react-icons/tb";


function MainPage() {
    // mainColor =#D5EDBB
    const [mainHeight,setMainHeight]=useState("20px");
    const [user,setUser]=useState();
    const [weatherRollup,setWeatherRollup]=useState(false);
    const [clothRollup,setClothRollup]=useState(false);
    const [subRollup,setSubRollup]=useState(false);
    const [busRollup,setBusRollup]=useState(false);

    // const rollupGo=()=>{
    //     mainHeight==="20px" ? setMainHeight("500px") : setMainHeight("20px");
    // };

    const wRollup=()=>{
        setWeatherRollup(!weatherRollup);
    }
    const cRollup=()=>{
        setClothRollup(!clothRollup);
    }
    const sRollup=()=>{
        setSubRollup(!subRollup);
    }
    const bRollup=()=>{
        setBusRollup(!busRollup);
    }

    

    
    return (
        <MainWrapper className='inner'>
            <ClothWidget id='2' className={clothRollup ? "opened" : null}>
                <button className="rollupBtn" onClick={cRollup}><span>Cloth Recommend</span></button>
                {clothRollup&&<ClothSlider/>}
            </ClothWidget>  
            <WeatherWidget id='1' className={weatherRollup ? "opened" : null}>
                <button className="rollupBtn" onClick={wRollup}><FaCloudSunRain/><span>Weather Info</span></button>
                {weatherRollup&&<OpenWeatherHour/>}
            </WeatherWidget>
            <SubwayWidget id='3' className={subRollup ? "opened" : null}>
                <button className='rollupBtn' onClick={sRollup}><IoSubway /><span>Find Subway</span></button>
                {subRollup&&<Subway/>}
            </SubwayWidget> 
            <BusWidget id='4' className={busRollup ? "opened" : null}>
                <button className='rollupBtn' onClick={bRollup}><TbBusStop/><span>Find Bus</span></button>
                {busRollup&&<BusDisplay/>}
            </BusWidget>
        </MainWrapper>
    )
}

export default MainPage

const MainWrapper=styled.div`
    width:100%;
    height:100%;
`

const WeatherWidget = styled.div`
    background-color:#235191;
    height:40px;
    display:block;
    transition:500ms;
    button{
        span{
            margin-left:5px;
        }
        text-align:center;
        justify-content:center;
        display:flex;
        align-items:center;
    }

    &.opened{
        height:660px;
    }
    `
const ClothWidget = styled.div`
background-color: lightblue;
height:40px;
display:block;
transition:500ms;
    button{
        span{
            margin-left:5px;
        }
        text-align:center;
        justify-content:center;
        display:flex;
        align-items:center;
    }

&.opened{
    height:660px;
}

`

const SubwayWidget = styled.div`
background-color: #808080;
height:40px;
display:block;
transition:500ms;
button{
    span{
            margin-left:5px;
        }
    text-align:center;
    justify-content:center;
    display:flex;
    align-items:center;
    color:yellow;
}

&.opened{
    height:700px;
}

`

const BusWidget = styled.div`
background-color: lightgreen;
height:40px;
display:block;
transition:500ms;
button{
    span{
            margin-left:5px;
        }
    text-align:center;
    justify-content:center;
    display:flex;
    align-items:center;
    background-color:transparent;
    color:black;
}
&.opened{
    height:660px;
}

`

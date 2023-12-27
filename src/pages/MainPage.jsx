import React, { useState } from 'react'
import styled from 'styled-components'
import Subway from '../components/Subway';
import OpenWeatherHour from '../components/OpenWeatherHour';


function MainPage() {
    // mainColor =#D5EDBB
    const [mainHeight,setMainHeight]=useState("20px");
    const [user,setUser]=useState();
    const [weatherRollup,setWeatherRollup]=useState(false);
    const [clothRollup,setClothRollup]=useState(false);

    // const rollupGo=()=>{
    //     mainHeight==="20px" ? setMainHeight("500px") : setMainHeight("20px");
    // };

    const wRollup=()=>{
        setWeatherRollup(!weatherRollup);
    }
    const cRollup=()=>{
        setClothRollup(!clothRollup);
    }

    

    
    return (
        <MainWrapper>
            <WeatherWidget className={weatherRollup ? "opened" : null}>
                <button className="rollupBtn" onClick={wRollup}>rollup</button>
                {/* <OpenWeatherHour/> */}
                {/* <Subway/> */}
            
            </WeatherWidget>
            <ClothWidget className={clothRollup ? "opened" : null}>
                <button className="rollupBtn" onClick={cRollup}>rollup</button>
                
            </ClothWidget>   
        </MainWrapper>
    )
}

export default MainPage

const MainWrapper=styled.div`
    width:100%;
    height:100%;
`

const WeatherWidget = styled.div`
    background-color:#D5EDBB;
    height:20px;
    display:block;
    transition:500ms;

    &.opened{
        height:500px;
    }
    `
const ClothWidget = styled.div`
background-color:#D5EDBB;
height:20px;
display:block;
transition:500ms;

&.opened{
    height:500px;
}
`

import React, { useState } from 'react'
import styled from 'styled-components'
import Subway from '../components/Subway';
import OpenWeatherHour from '../components/OpenWeatherHour';
import ClothSlider from '../components/ClothSlider';
import BusDisplay from '../components/BusDisplay';


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
            <WeatherWidget id='1' className={weatherRollup ? "opened" : null}>
                <button className="rollupBtn" onClick={wRollup}>rollup</button>
                {weatherRollup&&<OpenWeatherHour/>}
            </WeatherWidget>
            <ClothWidget id='2' className={clothRollup ? "opened" : null}>
                <button className="rollupBtn" onClick={cRollup}>rollup</button>
                {clothRollup&&<ClothSlider/>}
            </ClothWidget>  
            <SubwayWidget id='3' className={subRollup ? "opened" : null}>
                <button className='rollupBtn' onClick={sRollup}>rollup</button>
                {subRollup&&<Subway/>}
            </SubwayWidget> 
            <BusWidget id='4' className={busRollup ? "opened" : null}>
                <button className='rollupBtn' onClick={bRollup}>rollup</button>
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
    height:20px;
    display:block;
    transition:500ms;

    &.opened{
        height:500px;
    }
    `
const ClothWidget = styled.div`
background-color: lightblue;
height:20px;
display:block;
transition:500ms;

&.opened{
    height:500px;
}

`

const SubwayWidget = styled.div`
background-color: gray;
height:20px;
display:block;
transition:500ms;

&.opened{
    height:500px;
}

`

const BusWidget = styled.div`
background-color: lightgreen;
height:20px;
display:block;
transition:500ms;

&.opened{
    height:500px;
}

`

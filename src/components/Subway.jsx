/* eslint-disable */

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { IoSubway } from "react-icons/io5";

function Subway() {
    const [subwayData,setSubwayData]=useState(null);
    const [typing,setTyping]=useState(false);
    const [isLoad,setIsLoad]=useState(false);
    const [realtime,setRealtime]= useState([]);
    const [station,setStation]=useState('');
    const subwayApi=process.env.REACT_APP_SUBWAY_API_KEY;

    const getSubway =async()=>{
        try{
            const result=await axios.get(`http://swopenAPI.seoul.go.kr/api/subway/${subwayApi}/json/realtimeStationArrival/0/4/${station}`);
            setSubwayData(result.data);
            setIsLoad(true);
        }
        catch(error){
            console.error(error)
        }
    }

    const shootStation=(e)=>{
        setStation(e.target.value);
        if(station===""){
            setTyping(false)
        }
        else{
            setTyping(true)
        }
        
    }
    const submitStation=()=>{
        setSubwayData(null);
        getSubway();

    }
    //(1001:1호선, 1002:2호선, 1003:3호선, 1004:4호선, 1005:5호선 1006:6호선, 1007:7호선, 1008:8호선, 
    //1009:9호선, 1061:중앙선1063:경의중앙선, 1065:공항철도, 1067:경춘선, 1075:수의분당선 1077:신분당선, 1092:우이신설선, 1093:서해선, 1081:경강선)
    const lineCalculator=(lineId)=>{
        if(lineId=='1001'){
            return '1'
        }
        else if(lineId=='1002'){
            return '2'
        }
        else if(lineId=='1003'){
            return '3'
        }
        else if(lineId=='1004'){
            return '4'
        }
        else if(lineId=='1005'){
            return '5'
        }
        else if(lineId=='1006'){
            return '6'
        }
        else if(lineId=='1007'){
            return '7'
        }
        else if(lineId=='1008'){
            return '8'
        }
        else if(lineId=='1009'){
            return '9'
        }
        else if(lineId=='1061'){
            return 'gungjoong'
        }
        else if(lineId=='1063'){
            return 'gungjoong'
        }
        else if(lineId=='1065'){
            return 'air'
        }
        else if(lineId=='1067'){
            return 'gungchoon'
        }
        else if(lineId=='1075'){
            return 'suin'
        }
        else if(lineId=='1077'){
            return 'newboon'
        }
        else if(lineId=='1092'){
            return 'ui'
        }
        else if(lineId=='1093'){
            return 'west'
        }
        else if(lineId=='1081'){
            return 'gung'
        }
        else{
            return '호선 에러'
        }

    }

    return (
        <>
        <SubwayWrapper>
        <MainText><IoSubway /> Subway</MainText>
        <input type='text' value={station} onChange={shootStation}/>
        <button type='button' onClick={submitStation}>역 제출</button>
                <br/>
                <br/>
                {typing&&<span>선택된 역 : {station}역</span>}
            {subwayData && subwayData.realtimeArrivalList && subwayData.realtimeArrivalList.map((el) => (
                <ul>
                    <br/>
                    <li key={el.btrainNo}>지하철 노선명 : {el.trainLineNm}</li>
                    <li key={el.btrainNo}>도착시간 : {el.arvlMsg2}</li>
                    <li key={el.btrainNo}>{<img className="linePhoto" src={`subway_icon/${lineCalculator(el.subwayId)}.png`}/>}</li>
                </ul>
            ))}
        </SubwayWrapper>
        </>
    )
}

export default Subway

const SubwayWrapper = styled.div`
    color:white;
    input{
        background:transparent;
        border:none;
        border-bottom:solid 1px black;
    }
    button{
        background:transparent;
        color:white;
        border:none;
        &:hover{
            background-color:black;
        }

    }
`

const MainText = styled.div`
    width:360px;
    font-size:20px;
    color:yellow;
    text-align:center;
    margin:5px 0;
`
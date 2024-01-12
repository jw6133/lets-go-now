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
            const result=await axios.get(`http://swopenAPI.seoul.go.kr/api/subway/${subwayApi}/json/realtimeStationArrival/0/8/${station}`);
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

    console.log(subwayData);

    return (
        <>
        <SubwayWrapper>
            <MainText><IoSubway /> Subway</MainText>
            <InfoInput>
                <input type='text' placeholder="역 명 입력.." value={station} onChange={shootStation}/>
                <button type='button' onClick={submitStation}>역 제출</button>
            </InfoInput>
                {typing&&<div className='selectedStation'>- 선택된 역 : {station}역 -</div>}
                {subwayData && subwayData.realtimeArrivalList && subwayData.realtimeArrivalList.map((el) => (
                    <ul>
                        <li key={el.btrainNo} className='linePhoto'>{<img src={`subway_icon/${lineCalculator(el.subwayId)}.png`}/>}</li>
                        <li key={el.btrainNo}>지하철 노선명 : {el.trainLineNm}</li>
                        <li key={el.btrainNo}>현재 위치 : {el.arvlMsg3}</li>
                        <li key={el.btrainNo}>{el.arvlMsg2}</li>
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
        background:white;
        border:solid 1px black;
    }
    button{
        background:transparent;
        color:white;
        border:none;
        border : solid 1px black;
        &:hover{
            background-color:black;
        }

    }
    .selectedStation{
        width:100%;
        text-align:center;
        justify-content:center;
        margin:10px 0;
    }
    ul{
        height:60px;
        margin-bottom:10px;
        padding-top:5px;
        position:relative;
        background-color:rgba(160,160,160,0.3);
        border-radius:30px;
        margin-bottom:10px;
        font-size:14px;
        li{
            position:relative;
            left:60px;
            margin-bottom:5px;
            &:last-of-type{
                margin-bottom:0px;
            }
            &.linePhoto{
                position:absolute;
                left:20px;
                top:17px;
            }
        }
    }
`
const InfoInput=styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    padding-top:10px;
    margin-bottom:20px;
    input{
        height:21px;
    }
    button{
        margin-left:10px;
    }
`
const MainText = styled.div`
    width:100%;
    font-size:20px;
    color:yellow;
    text-align:center;
    margin:10px 0;
`
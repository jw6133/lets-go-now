import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import stationInfo from '../stationInfo.json'
import { parseString, xml2js } from 'react-native-xml2js'
import { TbBusStop } from "react-icons/tb";
import redBus from '../imgs/red.jpg';
import blueBus from '../imgs/blue.jpg';
import greenBus from '../imgs/green.jpg';
import yellowBus from '../imgs/yellow.jpg';
import lowBus from '../imgs/lowbus.jpg';

//https://www.datoybi.com/http-proxy-middleware/

function BusDisplay() {

    const [busData, setBusData] = useState(null);

    const [station, setStation] = useState('');
    const [busName, setBusName] = useState('');

    const [selectstId, setSelectstId] = useState(null);
    const [selectRoute, setSelectRoute] = useState(null);
    const [selectOrd, setSelectOrd] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dServiceKey=process.env.REACT_APP_DATAGOKR_BUS_API_KEY;

    const shootStation = (e) => {
        setStation(e.target.value);
    }

    const shootBusName = (e) => {
        setBusName(e.target.value);
    }

    const submitStation = (e) => {
        setBusData(null);
        findStation(busName, station);
    }

    const findStation = (aBusName, aStation) => {
        const foundStation = stationInfo.find(station =>
            station.노선명 === aBusName && station.정류소명 === aStation);

        if (foundStation) {
            setSelectstId(foundStation.NODE_ID);
            setSelectRoute(foundStation.ROUTE_ID);
            setSelectOrd(foundStation.순번);
        } else {
            setError('버스명과 정류장명이 잘못 입력되었습니다');
        }
    };

    useEffect(() => {
        if (selectstId && selectRoute && selectOrd) {
            getBus();
        }
    }, [selectstId, selectRoute, selectOrd]);

    const getBus = async () => {
        setIsLoading(true);
        setError(null);
        if (!station.trim()) {
            console.log('역 정보 없음');
            setIsLoading(false);
            return;
        }
        try {
            const res = await fetch(`/api/rest/arrive/getArrInfoByRoute?serviceKey=${dServiceKey}&stId=${selectstId}&busRouteId=${selectRoute}&ord=${selectOrd}`)

            if (!res.ok) {
                throw new Error('정보를 받아오지 못했습니다.')
            }
            const data = await res.text();
            const cleanedString = data.replace('\ufeff', '');

            const busJsonData = await new Promise((resolve, reject) => {
                parseString(cleanedString, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.parse(JSON.stringify(result)));
                    }
                });
            });
            if (busJsonData && busJsonData.ServiceResult && busJsonData.ServiceResult.msgBody) {
                setBusData(busJsonData);
            } else {
                throw new Error('유효하지 않은 데이터');
            }

        } catch (error) {
            console.error(error);
            setError("api 오류"+error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(()=>{
        {busData&&console.log(busData.ServiceResult.msgBody[0].itemList[0])};
    },[busData])

    const lastBusCal=(time)=>{
        console.log(time);
        const cut=time.slice(0,-2);
        // const year= cut.substr(0,4);
        // const month= cut.substr(4,2);
        // const day= cut.substr(6,2);
        const hour = cut.substr(8,2);
        const min = cut.substr(10,2);
        const lastBusTime=`${hour}시 ${min}분`;
        if(hour==''){
            return '막차시간을 불러오지 못하였습니다. 다시 시도해주세요.'
        }
        else{
            return lastBusTime;
        }

    }

    const busPic=(typeNum)=>{
        console.log(typeNum[0])
        switch(typeNum[0]){
            case "2": //마을버스 (초록)
                return <img src={greenBus}/>
            case "3": //간선버스 (파랑)
                return <img src={blueBus}/>
            case "4": //지선버스 (초록)
                return <img src={greenBus}/>
            case "5": //순환버스 (노랑)
                return <img src={yellowBus}/>
            case "6": //광역버스 (빨강)
                return <img src={redBus}/>
            default:
                return <img src={blueBus}/>
        }
        //<img src={busStation}/>
    }

    return (
        <>
        <BusWrapper>
            <MainText><TbBusStop/> <span>Bus</span></MainText>
            <BusInputForm>
            <p>
            버스명과 정류장명을 정확히 입력해주세요.<br/>
            버스에 따라 막차 시간이 조회가 안될 수 있습니다.
            </p>
            <span className='busMenu'>버스명 :</span>
            <input type='text' value={busName} onChange={shootBusName} />
            <span className='stationMenu'>정류장명 :</span>
            <input type='text' value={station} onChange={shootStation} />
            </BusInputForm>
            <CurrentBus>
                <span>현재 지정된 정보</span>
                <span>버스명 : {busName}</span>
                <span>정류장명 : {station}</span>
            </CurrentBus>
            <button type='button' className='submitBtn' onClick={submitStation}>도착정보 조회</button>
            

            {isLoading && <p>로딩 중...</p>}
        {error && <span>오류: {error}</span>}
        {busData && <>
        <ul>
            <div className='busName'>{busData.ServiceResult.msgBody[0].itemList[0].busRouteAbrv}<br/>
            <span className='subBusName'>{busData.ServiceResult.msgBody[0].itemList[0].arsId}</span></div>
            {busPic(busData.ServiceResult.msgBody[0].itemList[0].routeType)}
            <li>현재 버스 : {busData.ServiceResult.msgBody[0].itemList[0].arrmsg1}</li>
            <li>다음 버스 : {busData.ServiceResult.msgBody[0].itemList[0].arrmsg2}</li>
            <li>막차시간 : {busData.ServiceResult.msgBody[0].itemList[0].busType1[0]=="1"? <img src={lowBus}/> : lastBusCal(busData.ServiceResult.msgBody[0].itemList[0].lastTm[0])}</li>
        </ul>
        </>
        }
        </BusWrapper>
        </>
    )
}

export default BusDisplay
const BusWrapper=styled.div`
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
    .submitBtn{
        margin:10px auto;
        color:black;
        &:hover{
            color:white;
        }
    }
    .currentBus{
        width:100%;
        text-align:center;
        justify-content:center;
        margin:10px 0;
    }
    ul{
        position:relative;
        background-color:rgba(229,248,229,0.3);
        border-radius:30px;
        margin:10px 0px;
        width:100%;
        height:400px;
        .busName{
                position: relative;
                height:250px;
                left:10px;
                top:10px;
                font-size:48px;
                font-weight:bold;
                .subBusName{
                    position:relative;
                    top: 0;
                    left:5px;
                    font-size:16px;
                    font-weight:normal;
        }
        }

        img{
            position:absolute;
            right:10px;
            top:10px;
            width:200px;
            height:200px;
            margin-bottom:10px;
            }
        li{ 
            display:flex;
            position: relative;
            top:10px;
            left:10px;
            width:400px;
            margin-bottom:10px;
            
        }
        
    }
    
`

const MainText = styled.div`
    width:100%;
    color: black;
    font-size:28px;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content:center;
    padding-top:10px;
    margin-bottom:10px;
    span{
        margin-left:5px;
    }
`
const BusInputForm=styled.div`
    align-items:center;
    text-align:center;
    margin: 0px 5px;
    gap:5px;
    p{
        margin-bottom:5px;
    }
    .busMenu{
        margin-right:3px;
    }
    .stationMenu{
        margin-right:3px;
        margin-left:3px;
    }
    input{
        width : 120px;
        height: 24px;
        
    }
`
const CurrentBus = styled.div`
    margin-top:10px;
    text-align:center;
    span{
        display:flex;
        margin-bottom:5px;
        text-align:center;
        align-items:center;
        justify-content:center;
        &:last-of-type{
            margin-bottom:0px;
        }
    }
`
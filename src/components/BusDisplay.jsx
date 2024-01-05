import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import stationInfo from '../stationInfo.json'

function BusDisplay() {
    const [busData,setBusData]=useState(null);

    const [station,setStation]=useState('');
    const [busName,setBusName]=useState('');

    const [selectstId,setSelectstId]=useState(null);
    const [selectRoute,setSelectRoute]=useState(null);
    const [selectOrd,setSelectOrd]=useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const tServiceKey='bfb1040b-9548-4804-aa4d-d23b567855eb';

    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}/gateway/saArrInfoByRouteGet/v1`;

    console.log(stationInfo[2])

    const shootStation=(e)=>{
        setStation(e.target.value);
        console.log(station);
    }

    const shootBusName=(e)=>{
        setBusName(e.target.value);
        console.log(station);
    }

    const submitStation=()=>{
        getBus();
    }

    const findStation=()=>{ //작업중 - .노선명 인식 못하고있음.
        for(let i=0 ; i<46655 ; i++){
            if(stationInfo[i].노선명===busName&&stationInfo[i].정류소명===station){
                setSelectstId(stationInfo[i].NODE_ID);
                setSelectRoute(stationInfo[i].ROUTE_ID);
                setSelectOrd(stationInfo[i].순번);
                i=46654;
            }
        }
    }

    const getBus = async () => {
        if (!station.trim()) {
            console.log('역 정보 없음');
            return;
        }
        console.log(stationInfo[0].노선명);
        // findStation();
        setIsLoading(true);
        setError(null);
        try {
            const params = {
                serviceKey: tServiceKey, // Use environment variable here
                stId: '110000387', // This could be dynamic based on user input
                busRouteId: '100100037', // You can make this dynamic too
                ord: '1',
                busRouteType: '1'
            };
            const result = await axios.get(URL, { params });
            setBusData(result.data); // Adjust this according to the actual response format
        } catch (error) {
            console.error(error);
            setError('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    //https://apigw.tmoney.co.kr:5556/gateway/saArrInfoByRouteGet/v1/arrive/getArrInfoByRoute?serviceKey=${tServiceKey}&stId=50205&busRouteId=90000141&ord=1&busRouteType=1


    return (
        <>
        <br/>
        <br/>
        <MainText>버스</MainText>
        <br/>
        <br/>
        버스명 : 
        <input type='text' value={busName} onChange={shootBusName}/>
        <br/>
        정류장명 : 
        <input type='text' value={station} onChange={shootStation}/>
        <br/>
        <br/>
        <CurrentBus>
            현재 지정된 정보<br/>
            버스명 : {busName}<br/>
            정류장명 : {station}
        </CurrentBus>
        <button type='button' onClick={submitStation}>도착정보 조회</button>
                <br/>
                <br/>
                
        </>
    )
}

export default BusDisplay

const MainText = styled.span`
    font-size:24px;
    font-weight:bold;
`

const CurrentBus = styled.div`
    
`
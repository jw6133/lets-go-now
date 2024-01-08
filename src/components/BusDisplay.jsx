import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import stationInfo from '../stationInfo.json'

//https://www.datoybi.com/http-proxy-middleware/

function BusDisplay() {

    const [busData,setBusData]=useState(null);

    const [station,setStation]=useState('');
    const [busName,setBusName]=useState('');

    const [selectstId,setSelectstId]=useState(null);
    const [selectRoute,setSelectRoute]=useState(null);
    const [selectOrd,setSelectOrd]=useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const dServiceKey=process.env.REACT_APP_DATAGOKR_BUS_API_KEY;
    const dServiceKey='t9%2B9FhdE4WKAc9hoG0X566SsYpzJDRmtviyl1uTtBEgN%2Bjm5%2F5BNEcUTVVTkiaUUrxoJBVzAE0TQRtqdyFqAfA%3D%3D'


    const shootStation=(e)=>{
        setStation(e.target.value);
    }

    const shootBusName=(e)=>{
        setBusName(e.target.value);
    }

    const submitStation=()=>{
        getBus();
    }

    const findStation=()=>{
        for(let i=0 ; i<46654 ; i++){
            if(stationInfo[i].노선명===busName&&stationInfo[i].정류소명===station){
                setSelectstId(stationInfo[i].NODE_ID);
                setSelectRoute(stationInfo[i].ROUTE_ID);
                setSelectOrd(stationInfo[i].순번);
                i=46654;
            }
            if(i=46653&&!selectstId){
                setError('버스명과 정류장명이 잘못 입력되었습니다');
                return
            }
        }
    }

    const getBus = async () => {
        if (!station.trim()) {
            console.log('역 정보 없음');
            return;
        }
        findStation();
        setIsLoading(true);
        setError(null);
        try {
            const result = await axios.get(`/api/rest/arrive/getArrInfoByRoute?serviceKey=${dServiceKey}&stId=104900054&busRouteId=104900005&ord=3`)
            console.log(result);
        } catch (error) {
            console.error(error);
            setError("api 오류");
        } finally {
            setIsLoading(false);
        }
    };


    //https://apigw.tmoney.co.kr:5556/gateway/saArrInfoByRouteGet/v1/arrive/getArrInfoByRoute?serviceKey=${tServiceKey}&stId=50205&busRouteId=90000141&ord=1&busRouteType=1
    // const params = {
            //     serviceKey: tServiceKey, // Use environment variable here
            //     stId: '110000387', // This could be dynamic based on user input
            //     busRouteId: '100100037', // You can make this dynamic too
            //     ord: '1',
            //     busRouteType: '1'
            // };
            // const result = await axios.get(URL, { params });


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
                {error&&<span>{error}</span>}
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
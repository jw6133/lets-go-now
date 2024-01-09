import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import stationInfo from '../stationInfo.json'
import { parseString, xml2js } from 'react-native-xml2js'

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
    const dServiceKey="t9%2B9FhdE4WKAc9hoG0X566SsYpzJDRmtviyl1uTtBEgN%2Bjm5%2F5BNEcUTVVTkiaUUrxoJBVzAE0TQRtqdyFqAfA%3D%3D"

    const shootStation=(e)=>{
        setStation(e.target.value);
    }

    const shootBusName=(e)=>{
        setBusName(e.target.value);
    }

    const submitStation=(e)=>{
        console.log(busName);
        console.log(station);
        findStation(busName,station);
    }


    const findStation=(aBusName,aStation)=>{
        setSelectOrd(null);
        setSelectRoute(null);
        setSelectstId(null);
        {[...Array(46654)].map((value,index)=>{
            if(stationInfo[index].노선명==aBusName&&stationInfo[index].정류소명==aStation){
                setSelectstId(stationInfo[index].NODE_ID);
                setSelectRoute(stationInfo[index].ROUTE_ID);
                setSelectOrd(stationInfo[index].순번);
            }
            if(index=46653&&!selectstId){
                setError('버스명과 정류장명이 잘못 입력되었습니다');
                return
            }
        })}
        getBus();
    }

    const getBus = async () => {
        setIsLoading(true);
        setError(null);
        if (!station.trim()) {
            console.log('역 정보 없음');
            return;
        }
        try {
            fetch(`/api/rest/arrive/getArrInfoByRoute?serviceKey=${dServiceKey}&stId=${selectstId}&busRouteId=${selectRoute}&ord=${selectOrd}`)
            .then((res)=>res.text())
            .then((data)=>{
                const cleanedString=data.replace('\ufeff','');
                let busJsonData;
                parseString(cleanedString,(err,result)=>{
                    if(err !=null){
                        console.log(err);
                        return
                    }
                    busJsonData=JSON.parse(JSON.stringify(result));
                    console.log(busJsonData);
                });
                return
            })
            
            
        } catch (error) {
            console.error(error);
            setError("api 오류");
        } finally {
            setIsLoading(false);
        }
    };

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
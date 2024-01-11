import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import stationInfo from '../stationInfo.json'
import { parseString, xml2js } from 'react-native-xml2js'

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
        console.log(busName);
        console.log(station)
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

    return (
        <>
            <br />
            <br />
            <MainText>버스</MainText>
            <br />
            <br />
            버스명 :
            <input type='text' value={busName} onChange={shootBusName} />
            <br />
            정류장명 :
            <input type='text' value={station} onChange={shootStation} />
            <br />
            <br />
            <CurrentBus>
                현재 지정된 정보<br />
                버스명 : {busName}<br />
                정류장명 : {station}
            </CurrentBus>
            <button type='button' onClick={submitStation}>도착정보 조회</button>
            <br />
            <br />
            {isLoading && <p>로딩 중...</p>}
        {error && <span>오류: {error}</span>}
        {busData && <>
        <span>현재 버스 : {busData.ServiceResult.msgBody[0].itemList[0].arrmsg1}</span>
        <br/>
        <span>다음 버스 : {busData.ServiceResult.msgBody[0].itemList[0].arrmsg2}</span>
        </>
        }
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
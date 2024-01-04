import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

function BusDisplay() {
    //http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?busRouteId=4341100
    //https://senticoding.tistory.com/25 현재 참고중
    //https://yongjinsite.wordpress.com/2018/06/07/%EC%84%9C%EC%9A%B8-%EB%B2%84%EC%8A%A4-%EB%8F%84%EC%B0%A9-%EC%A0%95%EB%B3%B4-api-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/
    //data.go.kr
    const [busData,setBusData]=useState(null);
    const [station,setStation]=useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const serviceKey='bfb1040b-9548-4804-aa4d-d23b567855eb'
    const stId = '100100118'
    const busRouteId ='100100578'
    const ord="29"

    

    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
    const URL = `${PROXY}/gateway/saArrInfoByRouteGet/v1`;

    const getBus = async () => {
        if (!station.trim()) {
            console.log('역 정보 없음');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const params = {
                serviceKey: 'your-service-key', // Use environment variable here
                stId: station, // This could be dynamic based on user input
                busRouteId: '90000141', // You can make this dynamic too
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

    const shootStation=(e)=>{
        setStation(e.target.value);
        console.log(station);
    }

    const submitStation=()=>{
        setBusData(null);
        getBus();
    }
    // var request = require('request');

    // var url = 'http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll';
    // var queryParams = '?' + encodeURIComponent('serviceKey') + '=xQKyBpVK95INxXjbqzvAM4BMA12BIa7kOy0aRwQoL7Jkkek2AiRCFQfy98JCre0gQmLr9CooNFzxXKCoEREgIA%3D%3D'; /* Service Key*/
    // queryParams += '&' + encodeURIComponent('busRouteId') + '=' + encodeURIComponent('100100118'); /* */

    // request({
    //     url: url + queryParams,
    //     method: 'GET'
    // }, function (error, response, body) {
    // //console.log('Status', response.statusCode);
    // console.log('Headers', JSON.stringify(response.headers));
    // //console.log('Reponse received', body);
    // });


    return (
        <>
        <br/>
        <br/>
        <MainText>버스</MainText>
        <br/>
        <br/>
        <input type='text' value={station} onChange={shootStation}/>
        <button type='button' onClick={submitStation}>역 제출</button>
                <br/>
                <br/>
                {busData&&<span>선택된 역 : {station}역</span>}
            {busData && busData.map((el) => (
                <ul>
                    <br/>
                    
                </ul>
            ))}
        </>
    )
}

export default BusDisplay

const MainText = styled.span`
    font-size:24px;
    font-weight:bold;
`
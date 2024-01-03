import axios from 'axios'
import React, { useEffect, useState } from 'react'

function BusDisplay() {
    //http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?busRouteId=4341100
    //https://senticoding.tistory.com/25 현재 참고중
    //https://yongjinsite.wordpress.com/2018/06/07/%EC%84%9C%EC%9A%B8-%EB%B2%84%EC%8A%A4-%EB%8F%84%EC%B0%A9-%EC%A0%95%EB%B3%B4-api-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0/
    const [busData,setBusData]=useState(null);
    const serviceKey='xQKyBpVK95INxXjbqzvAM4BMA12BIa7kOy0aRwQoL7Jkkek2AiRCFQfy98JCre0gQmLr9CooNFzxXKCoEREgIA%3D%3D'
    const stId = '100100118'
    const busRouteId ='100100578'
    const ord="29"

    useEffect(()=>{
        getBus();
    },[])

    const getBus = async()=>{
        try{
            const result = await axios.get(`http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRoute?serviceKey=${serviceKey}&stId=${stId}&busRouteId=${busRouteId}&ord=${ord}`);
            setBusData(result);
            console.log(busData);
        }
        catch(error){
            console.error(error);
        }
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
        bus
        </>
    )
}

export default BusDisplay

import axios from 'axios'
import React, { useEffect, useState } from 'react'

function BusDisplay() {
    //http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?busRouteId=4341100
    const [busData,setBusData]=useState(null);

    useEffect(()=>{
        getBus();
    },[])

    const getBus = async()=>{
        try{
            const result = await axios.get(`http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?busRouteId=4341100`);
            setBusData(result);
            console.log(busData);
        }
        catch(error){
            console.error(error);
        }
    }


    return (
        <>
        bus
        </>
    )
}

export default BusDisplay

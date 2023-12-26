import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subway() {
    const [subwayData,setSubwayData]=useState(null);
    const [isLoad,setIsLoad]=useState(false);
    const [realtime,setRealtime]= useState([]);
    const subwayApi="50734a48546a773631313252556f7379";
    const city="서울";

    useEffect(()=>{
        getSubway();
    },[]);

    const getSubway =async()=>{
        try{
            const result=await axios.get(`http://swopenAPI.seoul.go.kr/api/subway/${subwayApi}/json/realtimeStationArrival/0/1/${city}`);
            setSubwayData(result);
            setIsLoad(true);
        }
        catch(error){
            console.error(error)
        }
    }
    //console.log(subwayData)
    console.log(subwayData.data.realtimeArrivalList)
    return (
        <>
            {subwayData.realtimeArrivalList}
        </>
    )
}

export default Subway

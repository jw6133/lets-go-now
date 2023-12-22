import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { googleLogin, onUserState } from '../api/firebase'
import OpenWeatherDisplay from './OpenWeatherDisplay'
import UserData from './UserData';

function Head() {

    const [user,setUser] = useState(null);

    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    },[])

    const gLogin=async()=>{
        const gUser=await googleLogin();
        setUser(gUser);
        
    }
    console.log(user);
    return (
        <HeadContainer>
            <span> Lets Go NOW </span>
            <button onClick={gLogin}>구글 로그인</button>
            <UserData user={user}/>
            <OpenWeatherDisplay/>
        </HeadContainer>
    )
}

export default Head


const HeadContainer = styled.div`
    width:360px;
    height:50px;
    border-bottom:solid 1px rgba(0,0,0,0.7);
    display:flex;
    justify-content:space-between;

`
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { googleLogOut, googleLogin, onUserState } from '../api/firebase'
import OpenWeatherDisplay from './OpenWeatherDisplay'
import UserData from './UserData';

function Head() {

    const [user,setUser] = useState(null);
    const [isLogin,setIsLogin]=useState(false);

    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    },[])

    const gLogin=async()=>{
        const gUser=await googleLogin();
        setUser(gUser);
        setIsLogin(true);
    }
    const gLogout=()=>{
        googleLogOut().then(setUser(null));
    }
    return (
        <HeadContainer>
            <span> Lets Go NOW </span>
            {user?(
                <>
                {user&&isLogin&&<UserData user={user}/>}
                <button onClick={gLogout}>로그아웃</button>
                </>
            ):(
                <button onClick={gLogin}>구글 로그인</button>
            )}
            {/* <button onClick={gLogin}>구글 로그인</button>
            {user && isLogin && <UserData user={user}/>} */}
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
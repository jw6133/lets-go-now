import React, { Component, useEffect, useState } from 'react'
import styled from 'styled-components'
import { googleLogOut, googleLogin, onUserState } from '../api/firebase'
import OpenWeatherDisplay from './OpenWeatherDisplay'
import UserData from './UserData';

function Head() {

    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const dummyProps=()=>{
        
    }


    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    },[])
    

    const gLogin = async () => {
        try {
            const gUser = await googleLogin();
            setUser(gUser);
            setIsLogin(true);
        } catch (error) {
            console.error(error);
            
        }
    };

    const gLogout = () => {
        googleLogOut()
            .then(() => {
                setUser(null);
                setIsLogin(false);
            })
            .catch((error) => {
                console.error( error);
            });
    };
    return (
        <HeadContainer>
            <span> Lets Go NOW </span>
            {user ? (
                <>
                    <UserData user={user} />
                    <button className='logOutBtn' onClick={gLogout}>로그아웃</button>
                </>) : (
                <button className='loginBtn' onClick={gLogin}>구글 로그인</button>
            )}
            <OpenWeatherDisplay propFunction={dummyProps}/>
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
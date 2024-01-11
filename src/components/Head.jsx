import React, { Component, useEffect, useState } from 'react'
import styled from 'styled-components'
import { googleLogOut, googleLogin, onUserState } from '../api/firebase'
import OpenWeatherDisplay from './OpenWeatherDisplay'
import UserData from './UserData';
import { FaPowerOff } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

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
            <LogoWrapper>
                <span>Lets go</span>
                <span className='main'>NOW</span>
            </LogoWrapper>
            {user ? (
                <>
                    <UserData user={user} />
                    <button className='logOutBtn' onClick={gLogout}><MdLogout /> Logout</button>
                </>) : (
                <button className='loginBtn' onClick={gLogin}><FaPowerOff /> Login</button>
            )}
            <HeadWeather>
            <OpenWeatherDisplay propFunction={dummyProps}/>
            </HeadWeather>
        </HeadContainer>
    )
}

export default Head


const HeadContainer = styled.div`
    background-color:lemonchiffon;
    width:100%;
    height:50px;
    border-bottom:solid 1px rgba(0,0,0,0.7);
    display:flex;
    justify-content:space-between;
    span{
        display:flex;
        vertical-align:middle;
        align-items:center;
    }
    .mainLogo{
        font-weight:bold;
    }
`
const LogoWrapper=styled.div`
    padding: 5px 5px;
    .main{
        font-size:24px;
    }
`
const HeadWeather = styled.div`
    display:flex;
    align-items:center;
`
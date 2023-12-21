import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { googleLogin } from '../api/firebase'
import WeatherDisplay from './WeatherDisplay'

function Head() {
    return (
        <HeadContainer>
            <span> Lets Go NOW </span>
            <button onClick={googleLogin}>구글 로그인</button>
            <WeatherDisplay/>
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
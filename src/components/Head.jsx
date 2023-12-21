import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { googleLogin } from '../api/firebase'

function Head() {
    return (
        <HeadContainer>
            <p>head</p>
            <button onClick={googleLogin}>구글 로그인</button>
        </HeadContainer>
    )
}

export default Head

const HeadContainer = styled.div`
    width:360px;
    height:50px;
    border-bottom:solid 1px rgba(0,0,0,0.7);

`
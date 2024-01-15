import React from 'react'
import Subway from '../components/Subway'
import styled from 'styled-components'

function SubwayPage() {
    return (
        <SubwayBackGround>
            <Subway/>
        </SubwayBackGround>
    )
}

export default SubwayPage
const SubwayBackGround=styled.div`
    background-color:#808080;
    height:700px;
`
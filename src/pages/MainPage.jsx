import React, { useState } from 'react'
import styled from 'styled-components'


function MainPage() {
    // mainColor =#D5EDBB
    const [isRollUp,setIsRollUp]=useState(true);
    const [user,setUser]=useState();

    
    return (
        <MainWrapper>
            <span>Main</span>
            
        </MainWrapper>
    )
}

export default MainPage
const MainWrapper = styled.div`
    background-color:#D5EDBB;
    height:750px;
`
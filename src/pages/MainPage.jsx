import React, { useState } from 'react'
import styled from 'styled-components'


function MainPage() {
    // mainColor =#D5EDBB
    const [mainHeight,setMainHeight]=useState("20px");
    const [user,setUser]=useState();

    const rollupGo=()=>{
        mainHeight==="20px" ? setMainHeight("500px") : setMainHeight("20px");
    };

    const MainWrapper = styled.div`
    background-color:#D5EDBB;
    height:${mainHeight};
    `

    
    return (
        <MainWrapper>
            <button onClick={rollupGo}>rollup</button>
            
        </MainWrapper>
    )
}

export default MainPage

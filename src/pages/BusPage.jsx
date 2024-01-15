import React from 'react'
import BusDisplay from '../components/BusDisplay'
import styled from 'styled-components'

function BusPage() {
    return (
        <BusBackGround>
            <BusDisplay/>
        </BusBackGround>
    )
}

export default BusPage

const BusBackGround= styled.div`
    background-color:lightgreen;
    height:660px;
`
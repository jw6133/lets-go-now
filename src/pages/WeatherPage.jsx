import React from 'react'
import OpenWeatherHour from '../components/OpenWeatherHour'
import styled from 'styled-components'

function WeatherPage() {
    return (
        <BackGroundC>
            <OpenWeatherHour/>
        </BackGroundC>
    )
}

export default WeatherPage

const BackGroundC = styled.div`
    background-color:#235191;
    height:660px;
`

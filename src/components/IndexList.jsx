import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-scroll'
import { IoIosPartlySunny } from "react-icons/io";
import { GiClothes } from "react-icons/gi";
import { FaTrainSubway } from "react-icons/fa6";
import { TbBusStop } from "react-icons/tb";

function IndexList() {


    return (
        <IndexClicker>
            <div>
                <Link to="1" spy={true} smooth={true}>
                    <span><IoIosPartlySunny /></span>
                </Link>
                <br/>
                <Link to="2" spy={true} smooth={true}>
                    <span><GiClothes /></span>
                </Link>
                <br/>
                <Link to="3" spy={true} smooth={true}>
                    <span><FaTrainSubway/></span>
                </Link>
                <br/>
                <Link to="4" spy={true} smooth={true}>
                    <span><TbBusStop/></span>
                </Link>
            </div>
        </IndexClicker>
    )
}

export default IndexList

const IndexClicker = styled.div`
    text-align:center;
    justify-content:center;
    background-color:white;
    border:solid 1px black;
    position:fixed;
    bottom:30px;
    right:30px;
    width:50px;
    height:100px;
`

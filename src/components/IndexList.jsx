import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { IoIosPartlySunny } from "react-icons/io";
import { GiClothes } from "react-icons/gi";
import { FaTrainSubway } from "react-icons/fa6";
import { TbBusStop } from "react-icons/tb";

function IndexList() {
    const links = [
        { to: '1', icon: <IoIosPartlySunny />, label: 'Weather' },
        { to: '2', icon: <GiClothes />, label: 'Clothing' },
        { to: '3', icon: <FaTrainSubway />, label: 'Subway' },
        { to: '4', icon: <TbBusStop />, label: 'Bus Stop' },
    ];

    return (
        <IndexClicker>
            <div>
                {links.map((link, index) => (
                    <div key={index}>
                        <Link to={link.to} spy={true} smooth={true}>
                            <span aria-label={link.label}>{link.icon}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </IndexClicker>
    );
}

export default IndexList;

const IndexClicker = styled.div`
    text-align: center;
    align-items:center;
    justify-content: center;
    background-color: lightgreen;
    font-size: 20px;
    border: solid 1px black;
    position: fixed;
    bottom: 50px;
    left: 700px;
    width: 50px;
    height: 150px;
    div{
        justify-content:center;
        align-items:center;
        text-align:center;
        width:30px;
        height: 30px;
        margin-bottom:10px;
        span{
            margin-left:13px;
        }
    }
    div:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

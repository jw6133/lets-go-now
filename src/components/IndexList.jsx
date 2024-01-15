import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
import { GiClothes } from "react-icons/gi";
import { FaCloudSunRain } from "react-icons/fa";
import { IoSubway } from "react-icons/io5";
import { TbBusStop } from "react-icons/tb";

function IndexList() {
    const links = [
        { to: '1', icon: <GiClothes />, label: 'Clothing' },
        { to: '2', icon: <FaCloudSunRain />, label: 'Weather' },
        { to: '3', icon: <IoSubway />, label: 'Subway' },
        { to: '4', icon: <TbBusStop />, label: 'Bus Stop' },
    ];

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
        window.removeEventListener('scroll', handleScroll); //clean up
        };
    }, [scroll]);

    const handleScroll = () => {
        setScroll(true);
        setTimeout(()=>{setScroll(false)},700)
  };

    return (
        <IndexClicker style={{opacity: scroll? 1:0.1}}>
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
    background-color:lemonchiffon;
    font-size: 20px;
    border: solid 1px black;
    position: fixed;
    bottom: 50px;
    left: 380px;
    width: 50px;
    height: 150px;
    transition:100ms;
    div{
        justify-content:center;
        align-items:center;
        text-align:center;
        width:30px;
        height: 30px;
        margin-bottom:5px;
        &:first-of-type{
            margin-top:10px;    
        }
        span{
            font-size:25px;
            height: 30px;
            margin-left:13px;
        }
    }
    div:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

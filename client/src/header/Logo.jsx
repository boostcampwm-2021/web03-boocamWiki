import React from "react";
import styled from "styled-components";
import logo from '../resource/img/logo.png';

const LogoBtn = styled.button`
    border: none;
    background: #E8A20C;
    height: 80px;
    &:hover{
        cursor: pointer;
    }
`;

const LogoTag = styled.img`
    width: 139px;
    height: 70px;
`;

const Logo = () => {
    return (
        <LogoBtn><LogoTag src={logo} /></LogoBtn>
    )
}

export default Logo;
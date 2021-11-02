import React from "react";
import styled from "styled-components";
import logo from '../resource/img/logo.png';

const LogoBtn = styled.button`
    border: none;
    background: #E8A20C;
    width: 139px;
    height: 83px;
    &:hover{
        cursor: pointer;
    }
    margin-right: 96px;
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
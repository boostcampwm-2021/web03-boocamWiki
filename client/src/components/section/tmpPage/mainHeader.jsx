import React from "react";
import styled from "styled-components";

const HeaderBox = styled.div`
    background: #E5E5E5;
    border-radius: 10px 10px 0px 0px;
    width: 1114px;
    height: 76px;
    position: relative;
    border-bottom: 2px solid #BBBBBB;
`;

const HeaderTitle = styled.div`
    position: absolute;
    left: 2.11%;
    right: 53.26%;
    top: 1.24%;
    bottom: 93.32%;
    font-family: "Noto Sans KR";
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 76px;
`;


const MainHeader = ({title}) => {
    return(
        <HeaderBox>
            <HeaderTitle>{title}</HeaderTitle>
        </HeaderBox>
    )
}

export default MainHeader;
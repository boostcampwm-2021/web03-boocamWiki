import React from "react";
import styled from "styled-components";

const Side = styled.div`
    width: 339px;
    height: 489px;
    background: white;
    margin-bottom: 20px;
    margin-top: 10px;
    border: 1px solid #D7D7D7;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    position: relative
`;

const SideTitle = styled.div`
    position: absolute;
    left: 4.13%;
    right: 0.29%;
    top: 0%;
    bottom: 86.91%;
    font-size: 20px;
    padding-left: 10px;
    font-family: "Noto Sans KR";
    font-weight: 500;
    font-size: 28px;
    display: flex;
    align-items: center;
`;

const RecentSection = () => {
    return (
        <Side>
            <SideTitle>최근 변경</SideTitle>
        </Side>
    )
}

export default RecentSection;
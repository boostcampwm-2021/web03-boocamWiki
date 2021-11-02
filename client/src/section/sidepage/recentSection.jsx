import React from "react";
import styled from "styled-components";
import SideHeader from "./sideHeader";

const Side = styled.div`
    width: 70%;
    height: 40%;
    background: white;
    margin-top: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    box-shadow: 5px 10px 10px gray;
    min-width: 339px;
`;

const RecentSection = () => {
    return (
        <Side>
            <SideHeader title='최신 문서' />
        </Side>
    )
}

export default RecentSection;
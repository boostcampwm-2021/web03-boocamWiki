import React from "react";
import styled from "styled-components";

const SideHeaderTitle = styled.div`
    height: 50px;
    background: #E5E5E5;
    display: flex;
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-size: 20px;
    padding-left: 10px;
`;

const SideHeader = ({title}) => {
    return(
        <SideHeaderTitle>{title}</SideHeaderTitle>
    )
}

export default SideHeader;
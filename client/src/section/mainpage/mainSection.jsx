import React from "react";
import styled from "styled-components";
import MainHeader from "./mainHeader";

const Main = styled.div`
    width: 1115px;
    height: 1200px;
    background: white;
    border: 1px solid #D7D7D7;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    position: relative;
    left: 225px;
    top: 10px;
`;

const MainPage = () => {
    return (
        <Main>
            <MainHeader title='제목' />
        </Main>
    )
}

export default MainPage;
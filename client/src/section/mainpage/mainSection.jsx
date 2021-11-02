import React from "react";
import styled from "styled-components";
import MainHeader from "./mainHeader";

const Main = styled.div`
    width: 50%;
    height: 90%;
    background: white;
    margin-top: 10px;
    border-radius: 5px;
    margin-left: 70px;
    box-shadow: 5px 10px 10px gray;

    min-width: 1114px;
`;

const MainPage = () => {
    return (
        <Main>
            <MainHeader title='제목' />
        </Main>
    )
}

export default MainPage;
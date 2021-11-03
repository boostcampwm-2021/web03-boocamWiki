import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from "styled-components";
import MainHeader from '../SectionTitle';

const Main = styled.div`
    width: 1115px;
    height: 1200px;
    background: white;
    border: 1px solid #D7D7D7;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-right: 50px;
    margin-top: 10px;
`;

const MainSection = () => {
    return (
        <Main>
          <MainHeader title='대문' />
        </Main>
    );
}
export default MainSection;
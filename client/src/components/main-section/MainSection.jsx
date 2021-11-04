import React from 'react';
import styled from 'styled-components';
import MainHeader from '../SectionTitle';
import { md } from './temp';
import MdParser from '../MdParser';

const Main = styled.div`
  width: 1115px;
  height: 100%;
  background: white;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  margin-right: 50px;
  margin-top: 10px;
`;

const MainSection = () => {
  return (
    <Main>
      <MainHeader title="대문" />
      <MdParser content={md} />
    </Main>
  );
};
export default MainSection;

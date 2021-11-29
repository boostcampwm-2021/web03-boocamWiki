import React from 'react';
import styled from 'styled-components';
import MainHeader from './SectionTitle';
import { BREAK_POINT_TABLET } from '../../utils/display-width';

const MainSection = ({ title, children, documentMode }) => {
  return (
    <Main>
      <MainHeader title={title} documentMode={documentMode} />
      {children}
    </Main>
  );
};

const Main = styled.div`
  width: 100%;
  max-width: 990px;
  min-height: 1000px;
  background: white;
  outline: 1px solid #d7d7d7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 0 0 40px 0;
  @media only screen and (max-width: ${BREAK_POINT_TABLET}px) {
    max-width: ${BREAK_POINT_TABLET}px;
  }
`;

export default MainSection;

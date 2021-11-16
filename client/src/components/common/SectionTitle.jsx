import React from 'react';
import styled from 'styled-components';

const MainHeader = ({ title }) => {
  return (
    <HeaderBox>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderBox>
  );
};

const HeaderBox = styled.div`
  background: #e5e5e5;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  height: 76px;
  position: relative;
  outline: 1px solid #d7d7d7;
`;

const HeaderTitle = styled.div`
  position: absolute;
  left: 2.11%;
  right: 53.26%;
  top: 1.24%;
  bottom: 93.32%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 76px;
`;

export default MainHeader;

import React from 'react';
import styled from 'styled-components';
import { flexBox, font } from '../../../../styles/styled-components/mixin';

const MbtiList = ({ order, mbti, color, ratio, count }) => {
  console.log(order, color, ratio);

  return (
    <MbtiListWrapper>
      <OrderWrapper>{order}</OrderWrapper>
      <MbtiWrapper color={color}>{mbti}</MbtiWrapper>
      <RatioWrapper>{ratio}%</RatioWrapper>
      <CountWrapper>{count}명</CountWrapper>
    </MbtiListWrapper>
  );
};

const MbtiListWrapper = styled.div`
  ${flexBox({ justifyContent: 'space-between', alignItems: 'center' })};
  ${font({ color: '#222222', size: '16px', weight: '500' })};
  width: 286px;
  height: 59px;
  padding: 13px;
  border-bottom: 1px solid #bbbbbb;
`;

const OrderWrapper = styled.p`
  color: #888888;
`;

const MbtiWrapper = styled.p`
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })};
  background-color: ${(props) => props.color || '#222222'};
  border-radius: 16.5px;
  color: #fff;
  width: 92px;
  height: 33px;
`;

const RatioWrapper = styled.p``;
const CountWrapper = styled.p``;

export default MbtiList;

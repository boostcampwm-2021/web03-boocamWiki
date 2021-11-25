import React from 'react';
import { ValidationWrap, ValidationBtn, CanText } from './style';

let canText = { text: '중복 확인해 주세요', color: '888888' };

const CreateBtn = ({ titleCheckHandler, canMake }) => {
  switch (canMake) {
    case true:
      canText = { text: '생성 가능', color: '#222222' };
      break;
    case false:
      canText = { text: '이미 존재합니다', color: '#F45452' };
      break;
    default:
      canText = { text: '값을 입력 하세요', color: '#888888' };
      break;
  }

  return (
    <ValidationWrap>
      <ValidationBtn onClick={titleCheckHandler}>중복 확인</ValidationBtn>
      <CanText color={canText.color}>{canText.text}</CanText>
    </ValidationWrap>
  );
};

export default CreateBtn;

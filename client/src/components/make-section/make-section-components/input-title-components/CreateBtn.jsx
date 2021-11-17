import React from "react";
import { ValidationWrap, ValidationBtn, CanText } from "./style";

const CreateBtn = ({ titleCheckHandler, canMake }) => {
  return (
    <ValidationWrap>
      <ValidationBtn onClick={titleCheckHandler}>생성 확인</ValidationBtn>
      {canMake ? <CanText color="#0055FB">생성 가능</CanText> : <CanText color="#F45452">생성 불가능</CanText>}
    </ValidationWrap>
  )
}

export default CreateBtn;
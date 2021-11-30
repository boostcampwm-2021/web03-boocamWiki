import React from 'react';
import styled from 'styled-components';
import { WordManager } from '@resource/message';
import { TextInputWrap, Text, Input } from './style';

const BoostCampId = ({ docData, id, changeData }) => {
  const checkIdValidation = (e) => {
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.slice(0, -1);
    }
    e.target.value = e.target.value.replace(/[^0-9A-Za-z]/g, '');
    e.target.value = e.target.value.toUpperCase();
  };

  return (
    <TextInputWrap>
      <Text>아이디</Text>
      {docData.member_type === WordManager.CAMPER && (
        <InputCamper type="text" ref={id} onInput={checkIdValidation} onChange={changeData} placeholder="ex) J123" />
      )}
      {docData.member_type !== WordManager.CAMPER && (
        <Input type="text" ref={id} onChange={changeData} placeholder={docData.boostcamp_id ?? '선택하세요'} readOnly />
      )}
    </TextInputWrap>
  );
};

const InputCamper = styled(Input)`
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

export default BoostCampId;

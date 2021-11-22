import React from 'react';
import { TextInputWrap, Text, Input } from './style';

const BoostCampId = ({ docData, id, changeData }) => {
  const { classification } = docData;

  return (
    <TextInputWrap>
      <Text>아이디</Text>
      {(classification === 'camper' || !classification) && (
        <Input type="text" ref={id} onChange={changeData} placeholder="입력하세요" />
      )}
      {classification === 'master' && (
        <Input type="text" ref={id} onChange={changeData} placeholder="MASTER" readOnly />
      )}
      {classification === 'manager' && (
        <Input type="text" ref={id} onChange={changeData} placeholder="MANAGER" readOnly />
      )}
    </TextInputWrap>
  );
};

export default BoostCampId;

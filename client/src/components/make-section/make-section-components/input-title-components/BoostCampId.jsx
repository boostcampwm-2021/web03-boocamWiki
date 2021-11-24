import React from 'react';
import { WordManager } from '../../../../resource/message';
import { TextInputWrap, Text, Input } from './style';

const BoostCampId = ({ docData, id, changeData }) => {
  return (
    <TextInputWrap>
      <Text>아이디</Text>
      {docData.member_type === WordManager.CAMPER && (
        <Input type="text" ref={id} onChange={changeData} placeholder="ex) J123" />
      )}
      {docData.member_type !== WordManager.CAMPER && (
        <Input type="text" ref={id} onChange={changeData} placeholder={docData.boostcamp_id ?? '선택하세요'} readOnly />
      )}
    </TextInputWrap>
  );
};

export default BoostCampId;

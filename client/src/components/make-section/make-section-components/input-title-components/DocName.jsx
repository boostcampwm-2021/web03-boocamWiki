import React from 'react';
import { TextInputWrap, Text, Input } from './style';

const DocName = ({ name, changeData }) => {
  return (
    <TextInputWrap>
      <Text>이름</Text>
      <Input type="text" ref={name} onChange={changeData} placeholder="ex) 홍길동" className="nameInput" />
    </TextInputWrap>
  );
};

export default DocName;

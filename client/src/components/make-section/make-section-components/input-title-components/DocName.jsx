import React from 'react';
import styled from 'styled-components';
import { TextInputWrap, Text, Input } from './style';

const DocName = ({ name, changeData }) => {
  const checkNameValidation = (e) => {
    if (e.target.value.length > 20) {
      e.target.value = e.target.value.slice(0, -1);
    }
    // eslint-disable-next-line no-useless-escape
    // e.target.value = e.target.value.replace(/[?.,;:|*~`!^\-_+<>@$%&\s*()=+{}#\[\]\\/]/g, '');
    e.target.value = e.target.value.replace(/[^0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
  };

  return (
    <TextInputWrap>
      <Text>이름</Text>
      <InputName
        type="text"
        ref={name}
        onInput={checkNameValidation}
        onChange={changeData}
        placeholder="ex) 홍길동"
        className="nameInput"
      />
    </TextInputWrap>
  );
};

const InputName = styled(Input)`
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
`;

export default DocName;

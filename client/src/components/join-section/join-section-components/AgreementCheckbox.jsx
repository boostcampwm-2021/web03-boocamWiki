import React from 'react';
import styled from 'styled-components';
import { font } from '@styles/styled-components/mixin';

const CheckInput = styled.input`
  cursor: pointer;
`;

const CheckSpan = styled.span`
  ${font({ size: '16px', weight: '500' })}
  margin: 0px 10px;
  cursor: pointer;
`;

const AgreementCheckbox = ({ _ref }) => {
  const checkClick = (e) => {
    _ref.current.click();
  };

  return (
    <div>
      <CheckInput type="checkbox" ref={_ref} />
      <CheckSpan onClick={checkClick}>위 사항을 확인했습니다.</CheckSpan>
    </div>
  );
};

export default AgreementCheckbox;

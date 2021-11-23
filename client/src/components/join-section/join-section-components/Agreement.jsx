import React, { useRef } from 'react';
import styled from 'styled-components';
import { font, flexBox } from '../../../styles/styled-components/mixin';
import AgreementButton from './AgreementButton';
import AgreementCheckbox from './AgreementCheckbox';
import AgreementContent from './AgreementContent';

const AgreementWrapper = styled.div`
  position: relative;
  top: 80px;
  ${flexBox({ direction: 'column', justifyContent: 'center', alignItems: 'center' })};
  padding: 35px 0px;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  width: 70%;
  max-width: 525px;
  min-width: 355px;

  div {
    margin: 15px 0px;
  }
`;

const AgreementTitle = styled.div`
  ${font({ size: '28px', weight: 'bold', color: '#000000' })};
`;

const Agreement = () => {
  const checkbox = useRef(null);

  return (
    <AgreementWrapper>
      <AgreementTitle>안내</AgreementTitle>
      <AgreementContent />
      <AgreementCheckbox _ref={checkbox} />
      <AgreementButton _ref={checkbox} />
    </AgreementWrapper>
  );
};

export default Agreement;

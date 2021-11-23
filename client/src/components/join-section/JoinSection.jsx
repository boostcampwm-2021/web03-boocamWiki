import React from 'react';
import styled from 'styled-components';
import MainSection from '../common/MainSection';
import Agreement from './join-section-components/Agreement';

const AgreementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const JoinSection = () => {
  return (
    <MainSection title="회원가입">
      <AgreementWrapper>
        <Agreement />
      </AgreementWrapper>
    </MainSection>
  );
};

export default JoinSection;

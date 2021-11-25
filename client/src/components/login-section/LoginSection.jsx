import React from 'react';
import styled from 'styled-components';
import { useValidate } from '../../utils/login';
import { font, flexBox } from '../../styles/styled-components/mixin';
import MainSection from '../common/MainSection';

const SectionWrapper = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center', justifyContent: 'center' })}
  position: relative;
  top: 100px;
  padding: 20px 20px;
`;

const LoginWrapper = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  max-width: 525px;
  min-width: 355px;
  padding: 40px;
  border: 1px solid #bbbbbb;
  border-radius: 20px;
`;

const LoginLabel = styled.p`
  ${font({ color: '#000000', size: '50px', weight: 'bold' })}
  padding: 30px 0px;
`;

const ButtonWrapper = styled.div`
  padding: 20px 0px;
  width: 100%;
`;

const LoginButton = styled.button`
  border-radius: 15px;
  width: 100%;
  height: 60px;
  ${font({ color: '#222222', size: '24px', weight: '500' })}
  background-color: #222222;
  color: #ffffff;
`;

const LoginSection = () => {
  useValidate(false);
  return (
    <MainSection title="로그인">
      <SectionWrapper>
        <LoginWrapper>
          <LoginLabel>로그인</LoginLabel>
          <ButtonWrapper>
            <a
              href={`https://www.github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK_URL}`}
            >
              <LoginButton type="button">깃허브로 로그인</LoginButton>
            </a>
          </ButtonWrapper>
        </LoginWrapper>
      </SectionWrapper>
    </MainSection>
  );
};

export default LoginSection;

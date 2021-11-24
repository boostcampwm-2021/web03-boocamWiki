import React from 'react';
import styled from 'styled-components';
import { useValidate } from '../../utils/login';
import MainSection from '../common/MainSection';

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  border-radius: 15px;
  width: 221px;
  height: 52px;
  font-size: 24px;
  font-weight: 500;
  background-color: #222222;
  color: #ffffff;
`;

const LoginSection = () => {
  useValidate(false);
  return (
    <MainSection title="로그인">
      <ButtonWrapper>
        <a
          href={`https://www.github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK_URL}`}
        >
          <LoginButton type="button">깃허브로 로그인</LoginButton>
        </a>
      </ButtonWrapper>
    </MainSection>
  );
};

export default LoginSection;

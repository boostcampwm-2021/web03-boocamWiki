import React from 'react';
import styled from 'styled-components';
import { useValidate } from '@utils/login';
import { font, flexBox } from '@styles/styled-components/mixin';
import githubWhiteIcon from '@resource/img/github-white.png';
import MainSection from '../common/MainSection';

const LoginSection = (): JSX.Element => {
  useValidate(false);
  return (
    <MainSection title="로그인">
      <SectionWrapper>
        <LoginWrapper>
          <LoginLabel>로그인</LoginLabel>
          <ButtonWrapper>
            <Link
              href={`https://www.github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_CALLBACK_URL}`}
            >
              <LoginButton type="button">
                <GithubIcon src={githubWhiteIcon} alt="github-icon" />
                Github로 계속하기
              </LoginButton>
            </Link>
          </ButtonWrapper>
        </LoginWrapper>
      </SectionWrapper>
    </MainSection>
  );
};

const SectionWrapper = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center', justifyContent: 'center' })}
  position: relative;
  top: 80px;
  padding: 20px 20px;
`;

const LoginWrapper = styled.div`
  ${flexBox({ direction: 'column', alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  max-width: 525px;
  min-width: 355px;
  padding: 20px 40px;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
`;

const LoginLabel = styled.p`
  ${font({ color: '#000000', size: '28px', weight: 'bold' })}
  margin-bottom: 40px;
`;

const ButtonWrapper = styled.div`
  padding: 20px 0px;
  width: 100%;
`;

const LoginButton = styled.button`
  ${font({ color: '#ffffff', size: '22px', weight: '400' })}
  ${flexBox({ justifyContent: 'center', alignItems: 'center' })}
  border-radius: 15px;
  width: 100%;
  height: 50px;
  background-color: #222222;
  position: relative;

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const GithubIcon = styled.img`
  position: absolute;
  left: 10px;
  width: 32px;
`;

const Link = styled.a`
  text-decoration: none;
`;

export default LoginSection;

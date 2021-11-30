import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import { font, flexBox } from '@styles/styled-components/mixin';
import cbScss from '@styles/scss/CallbackPage.module.scss';
import { authFetch, setAccessToken, setRefreshToken } from '@utils/login';

const LoadingWrapper = styled.div`
  ${flexBox({ direction: 'column', justifyContent: 'center', alignItems: 'center' })}
  width: 100vw;
  height: 100vh;
`;

const LoadingTitle = styled.div`
  ${font({ color: '#000000', size: '4rem', weight: 'bold' })}
  position: absolute;
  top: 52%;
  text-align: center;
  padding: 0px 20px;
  span {
    color: #0055fb;
  }
`;

const GithubCallbackPage = () => {
  const { search } = useLocation();
  const { code } = queryString.parse(search);
  const history = useHistory();

  const login = async (code) => {
    const res = await authFetch('/api/auth/github', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const {
      result: { accessToken, refreshToken },
      msg,
    } = await res.json();
    if (res.msg === 'fail') {
      return history.push('/error');
    }
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    if (res.status === 200) {
      return history.push('/');
    }
    if (msg === 'nonexistent user') {
      return history.push('/join');
    }
    return history.push('/error');
  };

  useEffect(async () => {
    login(code);
  }, []);

  return (
    <LoadingWrapper>
      <div className={cbScss.tetrominos}>
        <div className={`${cbScss.tetromino} ${cbScss.box1}`} />
        <div className={`${cbScss.tetromino} ${cbScss.box2}`} />
        <div className={`${cbScss.tetromino} ${cbScss.box3}`} />
        <div className={`${cbScss.tetromino} ${cbScss.box4}`} />
      </div>
      <LoadingTitle>
        BOOCAM <span>WIKI</span>
      </LoadingTitle>
    </LoadingWrapper>
  );
};

export default GithubCallbackPage;

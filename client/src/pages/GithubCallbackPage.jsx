import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';

const LoadingWrapper = styled.div``;

const GithubCallbackPage = () => {
  const { search } = useLocation();
  const { code } = queryString.parse(search);
  const history = useHistory();

  const login = async (code) => {
    const res = await fetch('/api/auth/github', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const {
      result: { accessToken, refreshToken },
      msg,
    } = await res.json();
    if (res.status === 200) {
      window.sessionStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('refreshToken', refreshToken);
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

  return <LoadingWrapper>깃허브 콜백 페이지</LoadingWrapper>;
};

export default GithubCallbackPage;

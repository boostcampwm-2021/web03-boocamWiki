import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export const tokenRefresh = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('refreshToken is not existed');
  }
  const REFRESH_URL = '/api/auth/refresh';
  const res = await fetch(REFRESH_URL, { headers: { Authorization: `Bearer ${refreshToken}` } });
  const { accessToken } = await res.json();
  sessionStorage.setItem('accessToken', accessToken);
};

export const getAccessToken = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  return accessToken;
};

export const getRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
};

export const removeAccessToken = () => {
  sessionStorage.removeItem('accessToken');
};

export const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

export const authFetch = async (url, options) => {
  let accessToken = getAccessToken();
  let res = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
  });
  if (res.status === 419) {
    await tokenRefresh();
    accessToken = getAccessToken();
    res = await fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
    });
  }
  return res;
};

export const isValidated = () => {
  const accessToken = getAccessToken();
  const { validation } = jwt.decode(accessToken) ?? {};
  if (!accessToken || !validation) {
    return false;
  }
  const refreshToken = getRefreshToken();
  const { exp } = jwt.decode(refreshToken) ?? {};
  if (!refreshToken || exp < Math.ceil(Date.now() / 1000)) {
    removeAccessToken();
    removeRefreshToken();
    return false;
  }
  return true;
};

export const useValidate = (check = true) => {
  const accessToken = getAccessToken();
  const history = useHistory();
  useEffect(() => {
    if (isValidated() !== check) {
      const msg = check ? '로그인한 사용자만 이용할 수 있습니다.' : '로그인하지 않은 사용자만 이용할 수 있습니다.';
      alert(msg);
      history.push('/');
    }
  }, [accessToken]);
};

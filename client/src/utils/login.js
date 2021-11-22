export const tokenRefresh = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
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

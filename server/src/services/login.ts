import axios from 'axios';
import config from '../config';

export const getAccessToken = async (code: string): Promise<string> => {
  if (code === undefined) {
    throw new Error('code is not existed');
  }
  const clientId = config.GITHUB_CLIENT_ID;
  const secret = config.GITHUB_SECRET;

  const TOKEN_URL = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`;
  const { data } = await axios.post(TOKEN_URL);

  const searchParams = new URLSearchParams(data);
  const accessToken = searchParams.get('access_token');

  return accessToken;
};

export const getUserInfo = async (accessToken: string): Promise<string> => {
  if (accessToken === undefined) {
    throw new Error('accessToken is not existed');
  }
  const USER_PROFILE_URL = 'https://api.github.com/user';
  const { data: userInformation } = await axios.get(USER_PROFILE_URL, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return userInformation;
};

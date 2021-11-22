import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { GithubUserInfo, TokenPayload } from '../types/apiInterface';

export async function getAccessToken(code: string): Promise<string> {
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
}

export async function getUserInfo(accessToken: string): Promise<GithubUserInfo> {
  if (accessToken === undefined) {
    throw new Error('accessToken is not existed');
  }
  const USER_PROFILE_URL = 'https://api.github.com/user';
  const { data: userInformation } = await axios.get(USER_PROFILE_URL, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return userInformation as GithubUserInfo;
}

export function generateAccessToken(TokenPayload: TokenPayload): string {
  return jwt.sign({ ...TokenPayload }, config.ACCESS_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '15m' });
}

export function generateRefreshToken(node_id: string): string {
  return jwt.sign({ node_id }, config.REFRESH_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '14 days' });
}

export function generateToken(TokenPayload: TokenPayload): { accessToken: string; refreshToken: string } {
  const accessToken = generateAccessToken(TokenPayload);
  const refreshToken = generateRefreshToken(TokenPayload.node_id);
  return { accessToken, refreshToken };
}

import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { generateAccessToken, generateToken, getAccessToken, getUserInfo } from '../services/login';
import { getUser, insertUser } from '../sql/users-query';
import { jwtAuthCheck, jwtRefreshCheck } from './middleware';

const router = express.Router();

router.post('/github', async (req: express.Request, res: express.Response) => {
  try {
    const { code } = req.body;
    const accessToken = await getAccessToken(code);
    const { login, node_id, avatar_url } = await getUserInfo(accessToken);
    const userInfo = { login, node_id, avatar_url };
    if (await getUser(userInfo.node_id)) {
      const tokens = generateToken({ ...userInfo, validation: true });
      return res.status(200).json({ result: { ...tokens }, msg: 'success' });
    } else {
      const tokens = generateToken({ ...userInfo, validation: false });
      return res.status(404).json({ result: { ...tokens }, msg: 'nonexistent user' });
    }
  } catch (err) {
    return res.status(404).json({ result: {}, msg: 'fail' });
  }
});

router.post('/join', jwtAuthCheck(false), async (req: express.Request, res: express.Response) => {
  try {
    const { login, node_id, avatar_url } = req.jwt;
    const userInfo = { login, node_id, avatar_url };
    const tokens = generateToken({ ...userInfo, validation: true });
    await insertUser({ node_id, login, avatar_url });
    return res.status(200).json({ result: { ...tokens }, msg: 'success' });
  } catch (err) {
    return res.status(404).json({ result: {}, msg: 'fail' });
  }
});

router.get('/refresh', jwtRefreshCheck, async (req: express.Request, res: express.Response) => {
  try {
    const [, refreshToken] = req.headers.authorization.split('Bearer ');
    const { node_id } = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET) as { node_id: string };
    const userInfo = await getUser(node_id);
    const accessToken = generateAccessToken({ ...userInfo, validation: true });
    return res.status(200).json({ result: { accessToken }, msg: 'success' });
  } catch (err) {
    return res.status(404).json({ result: {}, msg: 'fail' });
  }
});

export default router;

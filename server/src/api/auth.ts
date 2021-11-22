import * as express from 'express';
import { generateToken, getAccessToken, getUserInfo } from '../services/login';
import { isExistUser } from '../sql/users-query';
import { jwtAuthCheck } from './middleware';

const router = express.Router();

router.post('/github', async (req: express.Request, res: express.Response) => {
  try {
    const { code } = req.body;
    const accessToken = await getAccessToken(code);
    const { login, node_id, avatar_url } = await getUserInfo(accessToken);
    const userInfo = { login, node_id, avatar_url };
    if (await isExistUser(userInfo.node_id)) {
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

router.post('/join', jwtAuthCheck, async (req: express.Request, res: express.Response) => {
  try {
    const { answer } = req.body;
    if (answer === '210719') {
      const { login, node_id, avatar_url } = req.jwt;
      const userInfo = { login, node_id, avatar_url };
      const tokens = generateToken({ ...userInfo, validation: true });
      return res.status(200).json({ result: { ...tokens }, msg: 'success' });
    } else {
      return res.status(404).json({ result: {}, msg: 'wrong answer' });
    }
  } catch (err) {
    return res.status(404).json({ result: {}, msg: 'fail' });
  }
});

export default router;

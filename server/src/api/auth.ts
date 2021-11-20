import * as express from 'express';
import { getAccessToken, getUserInfo } from '../services/login';

const router = express.Router();

router.post('/github', async (req: express.Request, res: express.Response) => {
  try {
    const { code } = req.body;
    const accessToken = await getAccessToken(code);
    const userInformation = await getUserInfo(accessToken);
    return res.status(200).json({ msg: 'success' });
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: 'fail' });
  }
});

export default router;

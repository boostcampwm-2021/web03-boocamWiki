import * as express from 'express';
import { getMbtiCount } from '../sql/rank-query';
const router = express.Router();

router.get('/mbti', async (req: express.Request, res: express.Response) => {
  try {
    const count = await getMbtiCount();
    return res.status(200).json({
      result: count,
      msg: 'success',
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ result: {}, msg: 'fail to get mbti rank' });
  }
});

export default router;

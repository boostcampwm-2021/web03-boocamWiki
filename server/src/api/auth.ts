import * as express from 'express';

const router = express.Router();

router.post('/github', async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json({ msg: 'success' });
  } catch (err) {
    return res.status(404).json({ msg: 'fail' });
  }
});

export default router;

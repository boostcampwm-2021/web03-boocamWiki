import * as express from 'express';
import documentRouter from './documents';
import imageRouter from './images';
import authRouter from './auth';

const router = express.Router();
router.use('/documents', documentRouter);
router.use('/images', imageRouter);
router.use('/auth', authRouter);
export default router;

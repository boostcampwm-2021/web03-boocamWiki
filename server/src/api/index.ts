import * as express from 'express';
import documentRouter from './documents';
import imageRouter from './images';
import authRouter from './auth';
import categoryRouter from './categories';

const router = express.Router();
router.use('/documents', documentRouter);
router.use('/images', imageRouter);
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
export default router;

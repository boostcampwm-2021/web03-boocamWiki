import * as express from 'express';
import documentRouter from './documents';
import imageRouter from './images';

const router = express.Router();
router.use('/documents', documentRouter);
router.use('/images', imageRouter);
export default router;

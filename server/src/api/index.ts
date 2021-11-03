import * as express from 'express';
import documentRouter from './documents';

const router = express.Router();
router.use('/documents', documentRouter);
export default router;
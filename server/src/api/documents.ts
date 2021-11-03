import * as express from 'express';
import { getRecentUpdatedDoc } from '../sql/documents-query';

const router = express.Router();
router.get('/', async (req: express.Request, res:express.Response)=>{
    let result = await getRecentUpdatedDoc()
    res.json({'hi': 'boocam'});
})

export default router;
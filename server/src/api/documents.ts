import * as express from 'express';
import { getRecentUpdatedDoc, getSearchDoc } from '../sql/documents-query';
import { DocumentsSearch } from '../types/apiInterface';

const router = express.Router();
router.get('/', async (req: express.Request, res: express.Response) => {
  let result = await getRecentUpdatedDoc();
  res.json({ hi: 'boocam' });
});

router.get('/search', async (req: express.Request, res: express.Response) => {
  const queryParam: DocumentsSearch = req.query;
  try {
    const result = await getSearchDoc(queryParam);
    res.status(200).json({ result, msg: 'success' });
  } catch (err) {
    res.status(404).json({ result: [], msg: 'fail' });
  }
});

export default router;

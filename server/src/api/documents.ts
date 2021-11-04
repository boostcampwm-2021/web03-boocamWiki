import * as express from 'express';
import { createDoc, getRecentUpdatedDoc, getTopViewedDoc, getSearchDoc } from '../sql/documents-query';
import { DocumentsSearch } from '../types/apiInterface';

const router = express.Router();
router.get('/recents', async (req: express.Request, res: express.Response) => {
  const defaultCount = 20;
  let count = parseInt(req.query.count.toString()) || defaultCount;
  let result = await getRecentUpdatedDoc({ count: count });
  res.status(200);
  res.json({ msg: 'OK', result: result });
});

router.get('/ranks', async (req: express.Request, res: express.Response) => {
  const defaultCount = 20;
  const count = parseInt(req.query.count.toString()) || defaultCount;
  let result = await getTopViewedDoc({ count: count });
  res.status(200);
  res.json({ msg: 'OK', result: result });
});

router.post('/', async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  let result = await createDoc(req.body);
  res.status(200);
  res.json({ msg: 'OK', result: result });
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

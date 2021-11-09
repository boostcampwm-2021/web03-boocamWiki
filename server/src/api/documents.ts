import * as express from 'express';
import { createDoc, getRecentUpdatedDoc, getTopViewedDoc, getSearchDoc, getDoc } from '../sql/documents-query';
import { OnDocCreate } from '../subscribers/document-subscriber';
import { DocumentsSearch, DocumentsCreate } from '../types/apiInterface';

const router = express.Router();
router.get('/recents', async (req: express.Request, res: express.Response) => {
  const defaultCount = 20;
  let count = parseInt(req.query.count?.toString()) || defaultCount;
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
  res.status(200).json({ msg: 'OK', result: result });
  let query: DocumentsCreate = req.body;
  query.user_id = 'zoeas';
  OnDocCreate(query);
});

router.get('/search', async (req: express.Request, res: express.Response) => {
  const { generation, boostcamp_id, name, content, offset, limit }: Partial<DocumentsSearch> = req.query;
  try {
    const result = await getSearchDoc({ generation, boostcamp_id, name, content, offset, limit });
    if (result.length === 0) {
      return res.status(404).json({ result, msg: 'empty result' });
    }
    return res.status(200).json({ result, msg: 'success' });
  } catch (err) {
    return res.status(404).json({ result: [], msg: 'fail' });
  }
});

router.get('/', async (req: express.Request, res: express.Response) => {
  const { generation, boostcamp_id, name, content, offset, limit }: Partial<DocumentsSearch> = req.query;
  try {
    const result = await getDoc({ generation, boostcamp_id, name, content, offset, limit });
    if (result.length === 0) {
      return res.status(404).json({ result, msg: 'empty result' });
    }
    return res.status(200).json({ result, msg: 'success' });
  } catch (err) {
    return res.status(404).json({ result: [], msg: 'fail' });
  }
});

export default router;

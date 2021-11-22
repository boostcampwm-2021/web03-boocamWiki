import * as express from 'express';
import {
  createDoc,
  updateDoc,
  getRecentUpdatedDoc,
  getTopViewedDoc,
  getSearchDoc,
  getDoc,
  getCount,
} from '../sql/documents-query';
import { OnDocCreate, OnDocViewed } from '../subscribers/document-subscriber';
import { DocumentsSearch, DocumentsCreate, DocumentsUpdate } from '../types/apiInterface';

const router = express.Router();
router.get('/recents', async (req: express.Request, res: express.Response) => {
  try {
    const defaultCount = 20;
    const count = parseInt(req.query.count?.toString()) || defaultCount;
    const result = await getRecentUpdatedDoc({ count: count });
    res.status(200).json({ result, msg: 'OK' });
  } catch (err) {
    res.status(404).json({ result: [], msg: 'fail' });
  }
});

router.get('/ranks', async (req: express.Request, res: express.Response) => {
  const defaultCount = 20;
  try {
    const count = parseInt(req.query.count.toString()) || defaultCount;
    const result = await getTopViewedDoc({ count: count });
    res.status(200).json({ result, msg: 'OK' });
  } catch (err) {
    res.status(404).json({ result: [], msg: 'fail' });
  }
});

router.post('/', async (req: express.Request, res: express.Response) => {
  try {
    const createQuery: DocumentsCreate = req.body;
    await createDoc(createQuery);
    res.status(200).json({ msg: 'OK' });
    const updateQuery: DocumentsUpdate = req.body;
    updateQuery.user_id = 'zoeas';
    OnDocCreate(updateQuery);
  } catch (err) {
    return res.status(404).json({ msg: 'fail' });
  }
});

router.put('/', async (req: express.Request, res: express.Response) => {
  const result = await updateDoc(req.body);
  res.status(200).json({ msg: 'OK', result });
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

router.get('/count', async (req: express.Request, res: express.Response) => {
  const { generation, boostcamp_id, name, content }: Partial<DocumentsSearch> = req.query;
  try {
    const result = await getCount({ generation, boostcamp_id, name, content });
    return res.status(200).json({ result, msg: 'success' });
  } catch (err) {
    return res.status(404).json({ result: -1, msg: 'fail' });
  }
});

router.get('/', async (req: express.Request, res: express.Response) => {
  const { generation, boostcamp_id, name }: Partial<DocumentsSearch> = req.query;
  try {
    const result = await getDoc({ generation, boostcamp_id, name });
    if (result.length === 0) {
      return res.status(404).json({ result, msg: 'empty result' });
    }
    OnDocViewed(req.query as unknown as DocumentsSearch);
    const packed = packData(result);
    return res.status(200).json({ result: packed, msg: 'success' });
  } catch (err) {
    console.error(err);
    return res.status(404).json({ result: [], msg: 'fail' });
  }
});

function packData(result) {
  const doc = result[0];
  doc.classifications = result
    .filter((doc) => doc.classification)
    .reduce((prev, doc) => {
      prev.push(doc.classification);
      return prev;
    }, []);
  return doc;
}

export default router;

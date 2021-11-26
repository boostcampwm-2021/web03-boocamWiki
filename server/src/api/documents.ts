import * as express from 'express';
import { ipToInt } from '../services/util';
import {
  createDoc,
  updateDoc,
  getRecentUpdatedDoc,
  getTopViewedDoc,
  getSearchDoc,
  getDoc,
  getCount,
  updateRecentDoc,
  updateDocConcurrencyCheck,
  createDocConcurrencyCheck,
} from '../sql/documents-query';
import { OnDocCreate, OnDocViewed } from '../subscribers/document-subscriber';
import { DocumentsSearch, DocumentsCreate, DocumentsUpdate, DocConcurrencyState } from '../types/apiInterface';
import { jwtAuthCheck } from './middleware';

const router = express.Router();

const createDocConcurrencyCheckMiddle = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { generation, name, boostcamp_id } = req.body;
  const state: DocConcurrencyState = await createDocConcurrencyCheck({ generation, name, boostcamp_id });
  if (state === 0) next();
  else res.status(409).json({ msg: DocConcurrencyState[state] });
};

const updateDocConcurrencyCheckMiddle = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const { generation, name, boostcamp_id, updated_at } = req.body;
  const state: DocConcurrencyState = await updateDocConcurrencyCheck({ generation, name, boostcamp_id, updated_at });
  if (state === 0) next();
  else res.status(409).json({ msg: DocConcurrencyState[state] });
};

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

router.post(
  '/',
  jwtAuthCheck(true),
  createDocConcurrencyCheckMiddle,
  async (req: express.Request, res: express.Response) => {
    try {
      const createQuery: DocumentsCreate = req.body;
      await createDoc(createQuery);
      res.status(200).json({ msg: 'OK' });
      const updateQuery: DocumentsUpdate = req.body;
      updateQuery.user_id = req.jwt.node_id;
      updateQuery.ip = req.headers['x-forwarded-for'] ? String(ipToInt(req.headers['x-forwarded-for'])) : null;
      OnDocCreate(updateQuery);
    } catch (err) {
      return res.status(404).json({ msg: 'fail' });
    }
  },
);

router.put(
  '/',
  jwtAuthCheck(true),
  updateDocConcurrencyCheckMiddle,
  async (req: express.Request, res: express.Response) => {
    try {
      const result = await updateDoc(req.body);
      res.status(200).json({ msg: 'OK', result });
      const updateQuery: DocumentsUpdate = req.body;
      updateQuery.user_id = req.jwt.node_id;
      updateQuery.ip = req.headers['x-forwarded-for'] ? String(ipToInt(req.headers['x-forwarded-for'])) : null;
      updateRecentDoc(updateQuery);
      return;
    } catch (err) {
      res.status(404).json({ msg: 'fail' });
    }
  },
);

router.get('/search', async (req: express.Request, res: express.Response) => {
  const { generation, boostcamp_id, name, content, offset, limit }: Partial<DocumentsSearch> = req.query;
  const step = 8;
  try {
    const count = await getCount({ generation, boostcamp_id, name, content });
    let adjOffset = offset;
    if (isNaN(adjOffset) || adjOffset < 0) adjOffset = 0;
    if (offset * step > count) adjOffset = Math.floor(count / step);
    const result = await getSearchDoc({ generation, boostcamp_id, name, content, offset: adjOffset, limit });
    if (result.length === 0) {
      return res.status(404).json({ result, msg: 'empty result' });
    }
    return res.status(200).json({ result, offset: adjOffset, msg: 'success' });
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

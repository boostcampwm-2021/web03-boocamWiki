import * as express from 'express';
import { isNumberObject } from 'util/types';
import { getHangulCho, isHangulChar } from '../services/words';
import {
  getDocumentsWithClassification,
  getCountsWithClassification,
  getAllClassifications,
} from '../sql/classification-query';
const router = express.Router();

router.get('/:classification_id', async (req: express.Request, res: express.Response) => {
  try {
    const step = 30;
    const cid = req.params.classification_id;
    let offset = getSignedInt(req.query.offset?.toString() ?? '');
    const count = await getCountsWithClassification(cid);
    if ((offset - 1) * step > count) {
      offset = Math.floor(count / step + 1);
    }
    const result = await getDocumentsWithClassification(cid, offset);
    const packed = packDataWithName(result);
    const classifications = await getAllClassifications();
    res.status(200).json({
      result: {
        classifications,
        count,
        list: packed,
        offset,
      },
      msg: 'success',
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ result: [], msg: 'fail' });
  }
});

function packDataWithName(obj) {
  const packed = {};
  let c;
  obj.forEach((item) => {
    if (isHangulChar(item.name)) c = getHangulCho(item.name);
    else c = item.name[0];

    if (packed[c]) packed[c].push(item);
    else packed[c] = [item];
  });
  return packed;
}

function getSignedInt(str: string): number {
  let result = 1;
  try {
    result = parseInt(str);
    if (isNaN(result) || result < 1) result = 1;
  } catch {}
  return result;
}

export default router;

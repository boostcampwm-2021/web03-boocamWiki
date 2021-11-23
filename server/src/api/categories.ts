import * as express from 'express';
import { getHangulCho, isHangulChar } from '../services/words';
import { getDocumentsWithClassification } from '../sql/classification-query';
const router = express.Router();

router.get('/:classification_id', async (req: express.Request, res: express.Response) => {
  try {
    const cid = req.params.classification_id;
    const result = await getDocumentsWithClassification(cid);
    const packed = packDataWithName(result);
    res.status(200).json({
      result: packed,
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
  return Object.keys(packed)
    .sort()
    .reduce((obj, key) => {
      obj[key] = packed[key];
      return obj;
    }, {});
}

export default router;

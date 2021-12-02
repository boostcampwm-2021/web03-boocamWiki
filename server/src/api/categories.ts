import * as express from 'express';
import { packDataWithName } from '../services/words';
import {
  getDocumentsWithClassification,
  getCountsWithClassification,
  getAllClassifications,
} from '../sql/classification-query';
import { getSignedInt } from '../services/util';
const router = express.Router();

router.get('/:classification_id', async (req: express.Request, res: express.Response) => {
  try {
    const step = 30;
    const cid = req.params.classification_id;
    let offset = getSignedInt(req.query.offset?.toString() ?? '');
    const count = await getCountsWithClassification(cid);
    offset = Math.min(offset, Math.floor(count / step + (count % step ? 1 : 0)));
    offset = Math.max(1, offset);
    const result = await getDocumentsWithClassification(cid, offset, step);
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

export default router;

import * as express from 'express';
import { getDocumentsWithClassification } from '../sql/classification-query';
const router = express.Router();

router.get('/:classification_id', async (req: express.Request, res: express.Response) => {
  const cid = req.params.classification_id;
  const result = await getDocumentsWithClassification(cid);

  res.status(200).json({
    result,
  });
});

export default router;

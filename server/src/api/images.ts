import * as express from 'express';
import * as AWS from 'aws-sdk';
import * as multer from 'multer';
import config from '../config';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const upload = multer();

// const endpoint = new AWS.Endpoint(config.IMG_STORAGE_ENDPOINT);

// router.post('/', upload.single('image'), (req: express.Request, res: express.Response) => {
router.post('/', upload.single('image'), async (req: any, res: express.Response) => {
  const S3 = new AWS.S3({
    endpoint: config.IMG_STORAGE_ENDPOINT,
    region: 'kr-standard',
    credentials: {
      accessKeyId: config.ACCESS_KEY,
      secretAccessKey: config.SECRET_KEY,
    },
  });

  const imageName = uuidv4();
  await S3.putObject({
    Bucket: config.IMG_BUCKET_NAME,
    Key: `${imageName}.PNG`,
    ACL: 'public-read',
    Body: req.file.buffer,
    ContentType: 'image/png',
  }).promise();

  res.status(200).json({
    imageLink: `${config.IMG_STORAGE_ENDPOINT}/${config.IMG_BUCKET_NAME}/${imageName}.PNG`,
  });
});

export default router;

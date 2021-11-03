import * as express from 'express';
import * as morgan from 'morgan';
import router from '../api'

export default async ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.enable('trust proxy');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: false }));
  app.use('/', router)
  return app;
};

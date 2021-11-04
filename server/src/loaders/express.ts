import * as express from 'express';
import * as morgan from 'morgan';
import router from '../api';

export default async ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.enable('trust proxy');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: false }));
  app.use('/', router);
  return app;
};

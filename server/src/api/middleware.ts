import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { TokenPayload } from '../types/apiInterface';

export function jwtAuthCheck(validation: boolean = true) {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ msg: 'Authorization Header is not existed' });
    }
    try {
      const [, token] = req.headers.authorization.split('Bearer ');
      const payload: TokenPayload = jwt.verify(token, config.ACCESS_TOKEN_SECRET) as TokenPayload;
      if (payload.validation !== validation) {
        return res.status(401).json({ msg: 'Unexpected Token' });
      }
      req.jwt = payload;
      return next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(419).json({
          msg: 'Token is expired',
        });
      }
      return res.status(401).json({
        msg: 'Unavailable Token',
      });
    }
  };
}

export function jwtRefreshCheck(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: 'Authorization Header is not existed' });
  }
  try {
    const [, token] = req.headers.authorization.split('Bearer ');
    jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).json({
        msg: 'Token is expired',
      });
    }
    return res.status(401).json({
      msg: 'Unavailable Token',
    });
  }
}

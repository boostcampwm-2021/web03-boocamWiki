import { TokenPayload } from './apiInterface';

declare global {
  namespace Express {
    interface Request {
      jwt?: TokenPayload;
    }
  }
}

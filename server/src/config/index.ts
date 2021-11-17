import * as env from 'dotenv';
env.config();
export default {
  DB_PORT: process.env.DB_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PASS: process.env.DB_PASS,
  DB_USER: process.env.DB_USER,
  DB_DB: process.env.DB_DB,
  PORT: process.env.PORT,
  ACCESS_KEY: process.env.ACCESS_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
};

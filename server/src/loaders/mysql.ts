import * as mysql from 'mysql2/promise';
import config from '../config';
import db from '../services/db-pool';

export default async () => {
  const pool = mysql.createPool({
    host: config.DB_HOST,
    port: parseInt(config.DB_PORT),
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_DB,
  });
  db.pool = pool;
};

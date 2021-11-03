import db from '../services/db-pool';

export async function getRecentUpdatedDoc() {
  let result = await db.pool.query('SELECT * FROM `update`;');
  return result;
}

export async function getTopViewedDoc() {}

import db from '../services/db-pool';

export async function getRecentUpdatedDoc({ count }: { count: number }) {
  let result = await db.pool.query('SELECT * FROM `update`;');
  return result;
}

export async function getTopViewedDoc({ count }: { count: number }) {
  let result = await db.pool.query('SELECT * FROM `view`');
  return result;
}

export async function createDoc({ count }: { count: number }) {
  return true;
}

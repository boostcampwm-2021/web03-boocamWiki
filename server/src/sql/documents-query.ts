import db from '../services/db-pool';
import { DocumentsSearch } from '../types/apiInterface';

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

export async function getSearchDoc(params: DocumentsSearch) {
  const [result] = await db.pool.query(
    'SELECT generation, boostcamp_id, name ' +
      'FROM `document` ' +
      `WHERE ${Object.entries(params)
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${key === 'generation' ? value : `'${value}'`}`)
        .join(' AND ')}`,
  );
  return result;
}

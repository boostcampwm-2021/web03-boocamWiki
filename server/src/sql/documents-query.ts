import db from '../services/db-pool';
import { DocumentsSearch } from '../types/apiInterface';

export async function getRecentUpdatedDoc() {
  let result = await db.pool.query('SELECT * FROM update;');
  return result;
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

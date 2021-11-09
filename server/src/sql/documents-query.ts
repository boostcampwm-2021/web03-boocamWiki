import db from '../services/db-pool';
import { DocumentsCreate, DocumentsSearch } from '../types/apiInterface';

export async function getRecentUpdatedDoc({ count }: { count: number }) {
  let query =
    `SELECT generation, boostcamp_id, name, MAX(created_at) FROM \`update\` ` +
    `GROUP BY generation, boostcamp_id, name ORDER BY MAX(created_at) DESC LIMIT ${count}`;
  let [result] = await db.pool.query(query);
  return result;
}

export async function getTopViewedDoc({ count }: { count: number }) {
  let result = await db.pool.query('SELECT * FROM `view`');
  return result;
}

export async function createDoc(params: DocumentsCreate) {
  let query = `INSERT INTO document(${Object.entries(params)
    .map(([key]) => key)
    .toString()}) VALUES(${Object.entries(params)
    .map(([key, value]) => `'${value}'`)
    .toString()})`;
  const result = await db.pool.query(query);
  return result;
}

export async function getSearchDoc(params: DocumentsSearch): Promise<DocumentsSearch[]> {
  const { generation, boostcamp_id, name, content, offset = 0, limit = 10 } = params;
  if (Object.values(params).every((el) => el === undefined)) {
    throw new Error('Empty Query Params');
  }
  const query =
    'SELECT generation, boostcamp_id, name, content ' +
    'FROM `document` ' +
    `WHERE ${Object.entries({ generation, boostcamp_id, name })
      .filter(([, value]) => value)
      .map(([key, value]) => `${key}=${key === 'generation' ? value : `'${value}'`}`)
      .join(' AND ')}` +
    (content
      ? `${
          [generation, boostcamp_id, name].every((el) => el === undefined) ? '' : ' AND'
        } MATCH (content) AGAINST ('${content}' IN NATURAL LANGUAGE MODE)`
      : '') +
    ` LIMIT ${limit} OFFSET ${offset}`;
  const [result]: [DocumentsSearch[]] = await db.pool.query(query);
  return result;
}

export async function getDoc(params: DocumentsSearch) {
  const [result] = await db.pool.query(
    'SELECT created_at, updated_at, content, nickname, location, language, user_image, mbti, field, link, classification ' +
      'FROM `document` ' +
      `WHERE ${Object.entries(params)
        .filter(([, value]) => value)
        .map(([key, value]) => `${key}=${key === 'generation' ? value : `'${value}'`}`)
        .join(' AND ')}`,
  );
  return result;
}

export async function updateRecentDoc(params: DocumentsCreate) {
  let query =
    'INSERT INTO `update` ' +
    `(${Object.entries(params)
      .map(([key]) => key)
      .toString()})` +
    ' VALUES ' +
    `( ${Object.entries(params)
      .map(([key, value]) => `'${value}'`)
      .toString()})`;
  const [result] = await db.pool.query(query);
  return result;
}

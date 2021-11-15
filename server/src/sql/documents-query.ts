import { param } from 'express-validator';
import db from '../services/db-pool';
import { Document, DocumentsCreate, DocumentsRecent, DocumentsSearch, DocumentsView } from '../types/apiInterface';

function getObjectKey(arg: object): string[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key]) => key);
}

function getObjectValue(arg: object): string[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([, value]) => `\'${value}\'`);
}

function getDocumentKeyValue(arg: Document, stringTypeList: String[]): String[] {
  return Object.entries(arg)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${!stringTypeList.includes(key) ? `'${value}'` : value}`);
}

export async function getTopViewedDoc({ count }: { count: number }): Promise<DocumentsView[]> {
  const getQuery =
    `SELECT generation, boostcamp_id, name, SUM(count) as total_count FROM view ` +
    `WHERE DATE(created_at) > CURDATE() - INTERVAL 1 WEEK ` +
    `GROUP BY generation, boostcamp_id, name ORDER BY SUM(count) DESC LIMIT ${count}`;
  const [result] = await db.pool.query(getQuery);
  return result as DocumentsView[];
}

export async function createDoc(params: DocumentsCreate): Promise<void> {
  const query = `INSERT INTO document(${Object.entries(params)
    .map(([key]) => key)
    .toString()}) VALUES(${Object.entries(params)
    .map(([, value]) => `'${value}'`)
    .toString()})`;
  const result = await db.pool.query(query);
  if (result?.affectedRows === 0) {
    throw new Error('Insert does not executed');
  }
}

export async function updateDoc(params: DocumentsCreate) {
  let query = `UPDATE document SET ${Object.entries(params)
      .map(([key, value]) => `${key}='${value}'`)
      .join(', ')} WHERE generation='${params.generation}' AND boostcamp_id='${params.boostcamp_id}' AND name='${params.name}'`;
  const result = await db.pool.query(query);
  return result;
}

export async function getSearchDoc(params: DocumentsSearch): Promise<DocumentsSearch[]> {
  const { generation, boostcamp_id, name, content, offset = 0, limit = 8 } = params;
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
    ` LIMIT ${limit} OFFSET ${offset * limit}`;
  const [result]: [DocumentsSearch[]] = await db.pool.query(query);
  return result;
}

export async function getCount(params: Partial<DocumentsSearch>): Promise<number> {
  const { generation, boostcamp_id, name, content } = params;
  if (Object.values(params).every((el) => el === undefined)) {
    throw new Error('Empty Query Params');
  }
  const query =
    'SELECT count(*) as count ' +
    'FROM `document` ' +
    `WHERE ${getDocumentKeyValue({ generation, boostcamp_id, name }, ['generation']).join(' AND ')}` +
    (content
      ? `${
          [generation, boostcamp_id, name].every((el) => el === undefined) ? '' : ' AND'
        } MATCH (content) AGAINST ('${content}' IN NATURAL LANGUAGE MODE)`
      : '');
  const result: number = (await db.pool.query(query))[0][0].count;
  return result;
}

export async function getDoc(params: Document) {
  const [result] = await db.pool.query(
    'SELECT created_at, updated_at, content, nickname, location, language, user_image, mbti, field, link, classification ' +
      'FROM `document` ' +
      `WHERE ${getDocumentKeyValue(params, ['generation']).join(' AND ')}`,
  );
  return result;
}

export async function increaseViewCount(params: DocumentsSearch) {
  const whereClause = `WHERE boostcamp_id=\'${params.boostcamp_id}\' AND name=\'${params.name}\' AND generation=\'${params.generation}\' AND DATE(created_at)=CURDATE()`;
  const searchQuery = `SELECT * from view ` + whereClause;
  let [result] = await db.pool.query(searchQuery);
  if (result.length == 0) {
    const insertQuery = `INSERT INTO view(${getObjectKey(params).join(', ')}, count) VALUES (${getObjectValue(
      params,
    ).join(', ')}, 1)`;
    [result] = await db.pool.query(insertQuery);
  } else {
    const updateQuery = `UPDATE view SET count=count+1 ` + whereClause;
    [result] = await db.pool.query(updateQuery);
  }
  return result;
}

export async function getRecentUpdatedDoc({ count }: { count: number }): Promise<DocumentsRecent[]> {
  const query =
    `SELECT generation, boostcamp_id, name, MAX(created_at) as recent_created_at FROM \`update\` ` +
    `GROUP BY generation, boostcamp_id, name ORDER BY MAX(created_at) DESC LIMIT ${count}`;
  const [result] = await db.pool.query(query);
  return result as DocumentsRecent[];
}

export async function updateRecentDoc(params: DocumentsCreate): Promise<void> {
  const query =
    'INSERT INTO `update` ' +
    `(${getObjectKey(params).join(', ')})` +
    ' VALUES ' +
    `(${getObjectValue(params).join(', ')})`;
  const [result] = await db.pool.query(query);
  if (result?.affectedRows === 0) {
    throw new Error('Insert does not executed');
  }
}

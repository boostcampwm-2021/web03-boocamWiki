import db from '../services/db-pool';

import {
  Document,
  DocumentsCreate,
  DocumentsRecent,
  DocumentsSearch,
  DocumentsView,
  DocumentsUpdate,
  DocumentsConcurrencyValidation,
  DocConcurrencyState,
} from '../types/apiInterface';
import {
  getDocumentKeyValue,
  getObjectKey,
  getObjectValue,
  getDocumentsCreateObj,
  getDocumentsUpdateObj,
} from '../services/util';

//조회수 가장 높은 문서
export async function getTopViewedDoc({ count }: { count: number }): Promise<DocumentsView[]> {
  const getQuery =
    `SELECT generation, boostcamp_id, name, SUM(count) as total_count FROM view ` +
    `WHERE DATE(created_at) > CURDATE() - INTERVAL 1 WEEK ` +
    `GROUP BY generation, boostcamp_id, name ORDER BY SUM(count) DESC LIMIT ?`;
  const [result] = await db.pool.query(getQuery, [count]);
  return result as DocumentsView[];
}

//문서 만들기
export async function createDoc(params: DocumentsCreate): Promise<void> {
  const obj = getDocumentsCreateObj(params);
  const key = Object.keys(obj);
  const value = Object.values(obj);
  const query = `INSERT INTO document(${key.join(', ')}) VALUES(${new Array(value.length).fill('?').join(', ')})`;
  const result = await db.pool.query(query, [...value]);
  if (result?.affectedRows === 0) {
    throw new Error('Insert does not executed');
  }
}

//문서 만들기-동시성 체크
export async function createDocConcurrencyCheck(params: DocumentsConcurrencyValidation): Promise<DocConcurrencyState> {
  const query = 'SELECT updated_at from `document` where generation=? AND boostcamp_id=? AND name=?';
  const [result] = await db.pool.query(query, [params.generation, params.boostcamp_id, params.name]);
  if (result.length == 0) return DocConcurrencyState.DOCDEFAULT;
  return DocConcurrencyState.DOCCREATED;
}

//문서 편집-동시성 체크
export async function updateDocConcurrencyCheck(params: DocumentsConcurrencyValidation): Promise<DocConcurrencyState> {
  const query = 'SELECT updated_at from `document` where generation=? AND boostcamp_id=? AND name=?';
  const [result] = await db.pool.query(query, [params.generation, params.boostcamp_id, params.name]);
  if (result.length == 0) return DocConcurrencyState.DOCERASED;
  const remoteVersion = new Date(result[0].updated_at);
  const clientVersion = new Date(params.updated_at);
  if (remoteVersion > clientVersion) return DocConcurrencyState.DOCUPDATED;
  return DocConcurrencyState.DOCDEFAULT;
}

//문서 편집
export async function updateDoc(params: DocumentsCreate) {
  const obj = getDocumentsCreateObj(params);
  const key = Object.keys(obj);
  const value = Object.values(obj);
  const query = `UPDATE document SET ${key.map((key) => `${key}=?`).join(', ')} 
    WHERE generation=? AND boostcamp_id=? AND name=?`;

  const result = await db.pool.query(query, [...value, params.generation, params.boostcamp_id, params.name]);
  return result;
}

//문서 검색
export async function getSearchDoc(params: DocumentsSearch): Promise<DocumentsSearch[]> {
  const { generation, boostcamp_id, name, content, offset = 0, limit = 8 } = params;
  if (Object.values(params).every((el) => el === undefined)) {
    throw new Error('Empty Query Params');
  }

  let query = 'SELECT generation, boostcamp_id, name, content FROM `document` WHERE ';

  const validParams = Object.entries({ generation, boostcamp_id, name }).filter(([, value]) => value);
  const whereClause = validParams.map(([key]) => `${key}=?`).join(' AND ');
  const args = validParams.map(([key, value]) => value);

  query += whereClause;
  if (content) {
    query += `${args.length === 0 ? '' : ' AND'} MATCH (content) AGAINST (? IN NATURAL LANGUAGE MODE)`;
    args.push(content);
  }

  query += ` LIMIT ? OFFSET ?`;
  args.push(limit);
  args.push(offset * limit);

  const [result]: [DocumentsSearch[]] = await db.pool.query(query, args);
  return result;
}

// 문서 검색 개수
export async function getCount(params: Partial<DocumentsSearch>): Promise<number> {
  const { generation, boostcamp_id, name, content } = params;
  if (Object.values(params).every((el) => el === undefined)) {
    throw new Error('Empty Query Params');
  }
  let query = 'SELECT count(*) as count FROM `document` WHERE ';

  const validParams = Object.entries({ generation, boostcamp_id, name }).filter(([, value]) => value);
  const whereClause = validParams.map(([key]) => `${key}=?`).join(' AND ');
  const args = validParams.map(([key, value]) => value);

  query += whereClause;
  if (content) {
    query += `${args.length === 0 ? '' : ' AND'} MATCH (content) AGAINST (? IN NATURAL LANGUAGE MODE)`;
    args.push(content);
  }

  const result: number = (await db.pool.query(query, args))[0][0].count;
  return result;
}

// 문서 열람
export async function getDoc(doc: Document) {
  const query =
    'SELECT created_at, updated_at, doc.generation as generation, content, nickname, location, language, user_image, mbti, field, link, cl.classification_id as classification ' +
    'FROM `document` as doc LEFT JOIN document_classification as cl ' +
    'ON doc.generation = cl.generation AND doc.boostcamp_id = cl.boostcamp_id ' +
    'AND doc.name = cl.name ' +
    `WHERE doc.generation=? AND doc.boostcamp_id=? AND doc.name=?`;
  const [result] = await db.pool.query(query, [doc.generation, doc.boostcamp_id, doc.name]);
  return result;
}

//문서 조회수 업데이트
export async function increaseViewCount(doc: Document) {
  const searchQuery = `SELECT * FROM view WHERE boostcamp_id=? AND name=? AND generation=? AND DATE(created_at)=CURDATE()`;
  let [result] = await db.pool.query(searchQuery, [doc.boostcamp_id, doc.name, doc.generation]);
  if (result.length == 0) {
    const key = Object.keys(doc);
    const value = Object.values(doc);
    const insertQuery = `INSERT INTO view(${key.join(', ')}, count) VALUES (${new Array(value.length)
      .fill('?')
      .join(', ')} , 1)`;
    [result] = await db.pool.query(insertQuery, [...value]);
  } else {
    const updateQuery = `UPDATE view SET count=count+1 WHERE boostcamp_id=? AND name=? AND generation=? AND DATE(created_at)=CURDATE()`;
    [result] = await db.pool.query(updateQuery, [doc.boostcamp_id, doc.name, doc.generation]);
  }
  return result;
}

// 최근 변경 문서 조회
export async function getRecentUpdatedDoc({ count }: { count: number }): Promise<DocumentsRecent[]> {
  const query =
    `SELECT generation, boostcamp_id, name, MAX(created_at) as recent_created_at FROM \`update\` ` +
    `GROUP BY generation, boostcamp_id, name ORDER BY MAX(created_at) DESC LIMIT ?`;
  const [result] = await db.pool.query(query, [count]);
  return result as DocumentsRecent[];
}

export async function updateRecentDoc(params: DocumentsUpdate): Promise<void> {
  const obj = getDocumentsUpdateObj(params);
  const key = Object.keys(obj);
  const value = Object.values(obj);
  const query =
    'INSERT INTO `update` ' + `(${key.join(', ')})` + ' VALUES ' + `(${new Array(value.length).fill('?').join(', ')})`;
  const [result] = await db.pool.query(query, [...value]);
  if (result?.affectedRows === 0) {
    throw new Error('Insert does not executed');
  }
}

//모든 문서 offset으로 가져오기
export async function getAllDoc(offset: number, offStep: number) {
  const query = `SELECT * from document ORDER BY name LIMIT ? OFFSET ? `;
  const [result] = await db.pool.query(query, [offStep, (offset - 1) * offStep]);
  return result;
}

export async function getAllDocCount() {
  const query = `SELECT count(*) as count from document`;
  const result = (await db.pool.query(query))[0][0].count;
  return result;
}

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
    `GROUP BY generation, boostcamp_id, name ORDER BY SUM(count) DESC LIMIT ${count}`;
  const [result] = await db.pool.query(getQuery);
  return result as DocumentsView[];
}

//문서 만들기
export async function createDoc(params: DocumentsCreate): Promise<void> {
  const obj = getDocumentsCreateObj(params);
  const query = `INSERT INTO document(${getObjectKey(obj).join(', ')}) VALUES(${getObjectValue(obj, []).join(', ')})`;
  const result = await db.pool.query(query);
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
  const query = `UPDATE document SET ${Object.entries(obj)
    .map(([key, value]) => `${key}='${value}'`)
    .join(', ')} WHERE generation='${params.generation}' AND boostcamp_id='${params.boostcamp_id}' AND name='${
    params.name
  }'`;
  const result = await db.pool.query(query);
  return result;
}

//문서 검색
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

//
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
    'SELECT created_at, updated_at, doc.generation as generation, content, nickname, location, language, user_image, mbti, field, link, cl.classification_id as classification ' +
      'FROM `document` as doc LEFT JOIN document_classification as cl ' +
      'ON doc.generation = cl.generation AND doc.boostcamp_id = cl.boostcamp_id ' +
      'AND doc.name = cl.name ' +
      `WHERE ${getDocumentKeyValue(params, ['generation'], 'doc.').join(' AND ')}`,
  );
  return result;
}

//문서 조회수 업데이트
export async function increaseViewCount(params: DocumentsSearch) {
  const whereClause = `WHERE boostcamp_id=\'${params.boostcamp_id}\' AND name=\'${params.name}\' AND generation=\'${params.generation}\' AND DATE(created_at)=CURDATE()`;
  const searchQuery = `SELECT * from view ` + whereClause;
  let [result] = await db.pool.query(searchQuery);
  if (result.length == 0) {
    const insertQuery = `INSERT INTO view(${getObjectKey(params).join(', ')}, count) VALUES (${getObjectValue(
      params,
      [],
    ).join(', ')}, 1)`;
    [result] = await db.pool.query(insertQuery);
  } else {
    const updateQuery = `UPDATE view SET count=count+1 ` + whereClause;
    [result] = await db.pool.query(updateQuery);
  }
  return result;
}

//최근 변경 문서 조회
export async function getRecentUpdatedDoc({ count }: { count: number }): Promise<DocumentsRecent[]> {
  const query =
    `SELECT generation, boostcamp_id, name, MAX(created_at) as recent_created_at FROM \`update\` ` +
    `GROUP BY generation, boostcamp_id, name ORDER BY MAX(created_at) DESC LIMIT ${count}`;
  const [result] = await db.pool.query(query);
  return result as DocumentsRecent[];
}

export async function updateRecentDoc(params: DocumentsUpdate): Promise<void> {
  const obj = getDocumentsUpdateObj(params);
  const query =
    'INSERT INTO `update` ' +
    `(${getObjectKey(obj).join(', ')})` +
    ' VALUES ' +
    `(${getObjectValue(obj, ['ip']).join(', ')})`;
  const [result] = await db.pool.query(query);
  if (result?.affectedRows === 0) {
    throw new Error('Insert does not executed');
  }
}

//모든 문서 offset으로 가져오기
export async function getAllDoc(offset: number, offStep: number) {
  const query = `SELECT * from document ORDER BY name LIMIT ${offStep} OFFSET ? `;
  const [result] = await db.pool.query(query, (offset - 1) * offStep);
  return result;
}

export async function getAllDocCount() {
  const query = `SELECT count(*) as count from document`;
  const result = (await db.pool.query(query))[0][0].count;
  return result;
}

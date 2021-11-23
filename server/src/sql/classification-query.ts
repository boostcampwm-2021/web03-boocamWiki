import { DocumentsClassification } from '../types/apiInterface';
import db from '../services/db-pool';

export async function updateClassification(param: DocumentsClassification) {
  const insertAllCl = param.classification.map(async (cl) => {
    const query = `INSERT IGNORE INTO \`classification\`(classification_id) VALUES ('${cl}')`;
    const [result] = await db.pool.query(query);
    return result;
  });

  await Promise.all(insertAllCl);

  param.classification.forEach(async (cl) => {
    const query =
      `INSERT INTO \`document_classification\` (classification_id, generation, boostcamp_id, name) VALUES ` +
      `(\'${cl}\', \'${param.generation}\', \'${param.boostcamp_id}\', \'${param.name}\')`;
    const [result] = await db.pool.query(query);
    return result;
  });
}

export async function getDocumentsWithClassification(param: string) {
  const query =
    `SELECT doc.boostcamp_id as boostcamp_id, doc.generation as generation, doc.name as name ` +
    `FROM document as doc JOIN document_classification as cl ON ` +
    `doc.generation = cl.generation AND doc.boostcamp_id = cl.boostcamp_id AND ` +
    `doc.name = cl.name WHERE cl.classification_id = ?`;
  const [result] = await db.pool.query(query, param);
  return result;
}

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

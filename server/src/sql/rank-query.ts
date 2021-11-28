import db from '../services/db-pool';

export async function getMbtiCount() {
  const query =
    `SELECT mbti, count(*) as count ` +
    `FROM document ` +
    `WHERE mbti is not null and mbti != 'null' ` +
    `GROUP BY mbti ` +
    `ORDER BY count DESC;`;

  const [result] = await db.pool.query(query);
  return result;
}

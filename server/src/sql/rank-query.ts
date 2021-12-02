import db from '../services/db-pool';

export async function getMbtiCount() {
  const query =
    `SELECT mbti, count(*) as count ` +
    `FROM document ` +
    `WHERE mbti is not null and mbti != 'null' and mbti != '' ` +
    `GROUP BY mbti ` +
    `ORDER BY count DESC;`;

  const [result] = await db.pool.query(query);
  return result;
}

export async function getContributionCount() {
  const query =
    `SELECT up.user_id, count(*) as count ` +
    `FROM boocam_wiki.update as up INNER JOIN boocam_wiki.user as us ` +
    `ON up.user_id = us.user_id ` +
    `GROUP BY up.user_id ` +
    `ORDER BY count DESC ` +
    `LIMIT 10;`;

  const [result] = await db.pool.query(query);
  return result;
}

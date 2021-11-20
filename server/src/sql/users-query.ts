import db from '../services/db-pool';

export async function isExistUser(node_id: string): Promise<boolean> {
  const query = `SELECT count(*) as count FROM \`user\` WHERE user_id='${node_id}'`;
  const [{ count }] = await db.pool.query(query);
  return count > 0;
}

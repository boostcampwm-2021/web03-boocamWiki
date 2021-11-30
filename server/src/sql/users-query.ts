import db from '../services/db-pool';
import { GithubUserInfo } from '../types/apiInterface';

export async function getUser(node_id: string): Promise<GithubUserInfo> {
  const query = `SELECT user_id as node_id, login, avatar_url FROM \`user\` WHERE user_id=?`;
  const [result] = await db.pool.query(query, [node_id]);
  return result?.[0] as GithubUserInfo;
}

export async function insertUser({ node_id, login, avatar_url }: GithubUserInfo): Promise<void> {
  const query = `INSERT INTO \`user\`(user_id, login, avatar_url) VALUES (?, ?, ?)`;
  await db.pool.query(query, [node_id, login, avatar_url]);
}

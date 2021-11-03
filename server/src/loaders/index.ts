import expressLoader from './express';
import mysqlLoader from './mysql';

export default async ({ expressApp }): Promise<void> => {
  await expressLoader({ app: expressApp });
  console.log('Express Intialized');
};

export async function dbLoader({}): Promise<void> {
  await mysqlLoader();
  console.log('DB connected');
}

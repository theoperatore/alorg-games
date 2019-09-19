import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '../../lib/getDb';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const auth = await getAuth();
  const hasUser = !!auth.currentUser;
  res.status(hasUser ? 200 : 401).end();
}

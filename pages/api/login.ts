import { getDb } from '../../lib/getDb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (error) {
    return res.status(400).end();
  }

  const { email, password } = body;
  if (!email || !password) return res.status(400).end();

  const db = await getDb();
  try {
    const creds = await db.app
      .auth()
      .signInWithEmailAndPassword(email, password);

    if (creds.user) {
      return res.status(200).end();
    }

    return res.status(403).end();
  } catch (error) {
    console.error(error);
    return res.status(401).end();
  }
}

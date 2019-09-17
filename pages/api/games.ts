import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { getDb } from '../../lib/getDb';

export default async function games(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const db = await getDb();
  const { game, category } = JSON.parse(req.body);
  try {
    const save = {
      ...game,
      date_added: firebase.firestore.Timestamp.now(),
    };
    await db.collection(category).add(save);
    res.status(200).end();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

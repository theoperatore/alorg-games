import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { getDb } from '../../lib/getDb';

export default async function games(req: NextApiRequest, res: NextApiResponse) {
  // used in admin edit for getting alist of all games
  if (req.method === 'GET') {
    const [db] = await getDb();
    const games = await db.collection('games').get();
    const data = games.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    res.json(data);
    return;
  }

  // used in AdminAdd to add new games
  if (req.method === 'POST') {
    const [db] = await getDb();
    const { game, category } = JSON.parse(req.body);
    const timestamp = firebase.firestore.Timestamp.now();
    try {
      const save = {
        ...game,
        date_added: timestamp,
        date_modified: timestamp,
        category,
      };
      await db.collection('games').add(save);
      res.status(200).end();
    } catch (error) {
      res.status(500).send(error.message);
    }
    return;
  }

  res.status(405).end();
}

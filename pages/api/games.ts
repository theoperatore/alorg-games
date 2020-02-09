import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { getDb } from '../../lib/getDb';

export default async function games(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const [db] = await getDb();
    const games = await db.collection('games').get();
    const data = games.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    res.json(data);
    return;
  }

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

  if (req.method === 'PUT') {
    const [db] = await getDb();
    const { game, id } = JSON.parse(req.body);
    const timestamp = firebase.firestore.Timestamp.now();
    try {
      // game should be category, comment only
      const save = {
        ...game,
        date_modified: timestamp,
      };
      await db
        .collection('games')
        .doc(id)
        .update(save);

      res.status(200).end();
    } catch (error) {
      res.status(500).send(error.message);
    }
    return;
  }

  res.status(405).end();
}

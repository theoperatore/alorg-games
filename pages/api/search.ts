import { searchGame } from '../../lib/giantbomb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function searchGames(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { q } = req.query;

  let search = typeof q === 'string' ? q : q[0];
  const results = await searchGame(search);
  res.json({ results });
}

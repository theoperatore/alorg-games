import { NextApiRequest, NextApiResponse } from 'next';
import { getGameDetails } from '../../lib/giantbomb';

export default async function gameDetails(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  if (!id) return res.status(400).end('id query param required');

  const gbid = id instanceof Array ? id[0] : id;

  try {
    const game = await getGameDetails(gbid);
    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}

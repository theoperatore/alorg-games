import { NextApiResponse } from 'next';
import { LoadGamesSSR } from '../../lib/ssr/LoadGamesSSR';

// used for both refreshing the client but also to refresh a client
// while a user is looking at it using useSWR
export default async function games(_: never, res: NextApiResponse) {
  LoadGamesSSR.clear(0);
  try {
    const games = await LoadGamesSSR.load(0);
    res.json({ games });
  } catch (error) {
    console.log(error);
    res.status(502).end('failed to load games');
  }
}

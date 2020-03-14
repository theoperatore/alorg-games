import * as React from 'react';
import DataLoader from 'dataloader';
import { getDb } from './getDb';

export type Game = {
  id: string;
  name: string;
  platform: string;
  comment?: string;
  category: string;
  gbid: number;
  image: string;
};

const GamesLoader = new DataLoader<number, Game[]>(async () => {
  const [db] = await getDb();
  const games = await db.collection('games').get();
  const data = games.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  })) as Game[];
  return [data];
});

export function useGamesList(cacheBust: number = 0) {
  const [games, setGames] = React.useState<null | Game[]>(null);

  React.useEffect(() => {
    let active = true;

    setGames(null);
    GamesLoader.load(cacheBust).then(games => {
      if (active) {
        const sorted = games.sort((a, b) => (a.name < b.name ? -1 : 1));
        setGames(sorted);
      }
    });

    return () => {
      active = false;
    };
  }, [cacheBust]);

  return games;
}

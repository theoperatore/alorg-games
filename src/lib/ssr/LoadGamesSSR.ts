import Dataloader from 'dataloader';
import { useSSRDb } from './useSSRDb';

export type GameType = {
  id: string;
  name: string;
  platform: string;
  comment?: string;
  image: string;
  gbid: number;
};

export type GamesList = {
  inprogress: GameType[];
  beaten: GameType[];
  ondeck: GameType[];
  setaside: GameType[];
};

export const LoadGamesSSR = new Dataloader<any, GamesList>(
  async () => {
    const [db] = await useSSRDb();
    const [
      inprogressRef,
      ondeckRef,
      beatenRef,
      setasideRef,
    ] = await Promise.all([
      db
        .collection('games')
        .where('category', '==', 'inprogress')
        .orderBy('date_modified', 'desc')
        .get(),
      db
        .collection('games')
        .where('category', '==', 'ondeck')
        .orderBy('date_modified', 'desc')
        .get(),
      db
        .collection('games')
        .where('category', '==', 'beaten')
        .orderBy('date_modified', 'desc')
        .get(),
      db
        .collection('games')
        .where('category', '==', 'setaside')
        .orderBy('date_modified', 'desc')
        .get(),
    ]);

    const inprogress: GameType[] = inprogressRef.docs.map<GameType>(doc => ({
      id: doc.id,
      name: doc.get('name'),
      platform: doc.get('platform'),
      comment: doc.get('comment'),
      gbid: doc.get('gbid'),
      image: doc.get('image'),
    }));
    const ondeck: GameType[] = ondeckRef.docs.map<GameType>(doc => ({
      id: doc.id,
      name: doc.get('name'),
      platform: doc.get('platform'),
      comment: doc.get('comment'),
      gbid: doc.get('gbid'),
      image: doc.get('image'),
    }));
    const beaten: GameType[] = beatenRef.docs.map<GameType>(doc => ({
      id: doc.id,
      name: doc.get('name'),
      platform: doc.get('platform'),
      comment: doc.get('comment'),
      gbid: doc.get('gbid'),
      image: doc.get('image'),
    }));
    const setaside: GameType[] = setasideRef.docs.map<GameType>(doc => ({
      id: doc.id,
      name: doc.get('name'),
      platform: doc.get('platform'),
      comment: doc.get('comment'),
      gbid: doc.get('gbid'),
      image: doc.get('image'),
    }));
    return [
      {
        inprogress,
        ondeck,
        beaten,
        setaside,
      },
    ];
  },
  {
    batch: false,
  },
);

import { Game } from './useGamesList';
import { useFirebase } from './getDb';
import { mutate } from 'swr';

export type Status = 'success' | 'failure';
export type GameToSave = Omit<Game, 'id'>;

export function useGamesPost() {
  const firebase = useFirebase();

  return async (game: GameToSave): Promise<Status> => {
    const timestamp = firebase.firestore.Timestamp.now();
    const payload = {
      ...game,
      date_added: timestamp,
      date_modified: timestamp,
    };

    try {
      await firebase
        .firestore()
        .collection('games')
        .add(payload);

      mutate('/api/games');
      return 'success';
    } catch (error) {
      console.log(error);
      alert(error.message);
      return 'failure';
    }
  };
}

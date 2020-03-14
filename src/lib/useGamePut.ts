import { Game } from './useGamesList';
import { useFirebase } from './getDb';

type Status = 'success' | 'failure';

export function useGamePut() {
  const firebase = useFirebase();

  return async (
    game: Game,
    category: string,
    comment?: string,
  ): Promise<Status> => {
    const timestamp = firebase.firestore.Timestamp.now();
    const id = game.id;
    const payload = {
      category,
      comment,
      date_modified: timestamp,
    };

    try {
      await firebase
        .firestore()
        .collection('games')
        .doc(id)
        .update(payload);

      return 'success';
    } catch (error) {
      console.log(error);
      alert(error.message);
      return 'failure';
    }
  };
}

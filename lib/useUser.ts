import * as React from 'react';
import { useFirebase } from './getDb';

type User = 'pending' | 'success' | 'failed';

export function useUser(): User {
  const firebase = useFirebase();
  const [user, setUser] = React.useState<User>('pending');

  React.useEffect(() => {
    const off = firebase.auth().onAuthStateChanged(maybeUser => {
      if (maybeUser) {
        setUser('success');
      } else {
        setUser('failed');
      }
    });

    return () => {
      off();
    };
  }, []);

  return user;
}

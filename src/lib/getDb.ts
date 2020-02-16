import firebase from 'firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import { creds } from './clientCredentials';

export async function getDb(): Promise<
  [firebase.firestore.Firestore, firebase.auth.Auth]
> {
  // uncomment if you only want this to execute on the server.
  // const firebase = await import('firebase/app');
  // await import('@firebase/firestore');
  // await import('@firebase/auth');
  // const creds = await import('./clientCredentials');

  try {
    firebase.initializeApp(creds);
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return [firebase.firestore(), firebase.auth()];
}

export function useFirebase() {
  try {
    firebase.initializeApp(creds);
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return firebase;
}

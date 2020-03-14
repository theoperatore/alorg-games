export async function useSSRDb(): Promise<[firebase.firestore.Firestore]> {
  // uncomment if you only want this to execute on the server.
  const firebase = await import('firebase/app');
  await import('@firebase/firestore');
  await import('@firebase/auth');
  const { creds } = await import('../clientCredentials');

  try {
    firebase.initializeApp(creds);
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return [firebase.firestore()];
}

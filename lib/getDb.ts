export async function getDb() {
  const config = await import('../secrets.json');
  const firebase = await import('firebase/app');
  await import('@firebase/firestore');
  await import('@firebase/auth');

  try {
    firebase.initializeApp(config.firebase);
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  return firebase.firestore();
}

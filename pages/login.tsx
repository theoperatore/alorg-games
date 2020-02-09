import * as React from 'react';
import { PageLayout } from '../components/PageLayout';
import Router from 'next/router';
import { AppHead } from '../components/Head';
import { useUser } from '../lib/useUser';
import { useFirebase } from '../lib/getDb';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const firebase = useFirebase();
  const user = useUser();

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (user === 'success') {
      alert('Success! Redirecting to admin');
      Router.push('/admin');
    }
  }, [user]);

  return (
    <>
      <AppHead title="Login" />
      <PageLayout>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              placeholder="email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              type="email"
            />
          </div>
          <div>
            <input
              placeholder="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              type="password"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            Log in
          </button>
        </form>
      </PageLayout>
    </>
  );
}

import * as React from 'react';
import { PageLayout } from '../components/PageLayout';
import Router from 'next/router';
import { AppHead } from '../components/Head';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    ev.stopPropagation();
    setLoading(true);
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      // perhaps it's better to have an authStateChanged
      // on the server before sending the 200 OK?
      Router.push('/admin');
    } else {
      setLoading(false);
      console.log('error logging in', response.status);
    }
  }

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

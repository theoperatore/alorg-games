import * as React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { PageLayout } from '../components/PageLayout';
import { useUser } from '../lib/useUser';
import { AppHead } from '../components/Head';
import { AdminAdd } from '../components/AdminAdd';
import { AdminEdit } from '../components/AdminEdit';
import { Redirect } from '../components/Redirect';

const Admin: NextPage = () => {
  const user = useUser();

  if (user === 'failed') {
    return <Redirect to="/login" />;
  }

  if (user === 'pending') {
    return (
      <>
        <AppHead title="Admin">
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          ></link>
        </AppHead>
        <PageLayout>
          <p>verifying user...</p>
        </PageLayout>
      </>
    );
  }

  return (
    <>
      <AppHead title="Admin">
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        ></link>
      </AppHead>
      <PageLayout>
        <div className="mb-4">
          <h1>Admin the db</h1>
          <Link href="/">
            <a title="View games">View games</a>
          </Link>
        </div>
        <AdminEdit />
        <AdminAdd />
      </PageLayout>
    </>
  );
};

export default Admin;

import * as React from 'react';
import Head from 'next/head';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export function AppHead(props: Props) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="apple-mobile-web-app-title" content="AlorgGames"></meta>
      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="description"
        content="A place to put games I've played, playing, or have stop playing"
      />

      <link rel="manifest" href="/static/manifest.json" />
      <link rel="icon" type="image/png" href="/static/cd.png" />
      <link rel="apple-touch-icon" href="/static/cd.png"></link>
      <title>{props.title}</title>
      {props.children}
    </Head>
  );
}

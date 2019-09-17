import * as React from 'react';
import { PageLayout } from '../components/PageLayout';

export default function Why() {
  return (
    <PageLayout>
      <h1>Wat dis?</h1>
      <section className="container">
        <p>
          I started this site with inspiration from{' '}
          <a
            href="https://shauninman.com/unplayed/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shaun Inman's Unplayed
          </a>
          , a website around keeping track of what you're playing, what you have
          played, what you liked and didn't like.
        </p>
        <p>
          I've always wanted to have a place to keep some of my thoughts on
          games and a place to remember what I've played and enjoyed or didn't
          enjoy. I play the same games over and over again. It's nice to have a
          diary of these things.
        </p>
        <p>This site is built using:</p>
        <ul>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://reactjs.org/"
            >
              React
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://nextjs.org/"
            >
              Next.js
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.digitalocean.com/"
            >
              Digital Ocean for DNS & hosting
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.digitalocean.com/"
            >
              Github
            </a>
          </li>
        </ul>
      </section>
      <style jsx>
        {`
          .container {
            margin-top: 24px;
            max-width: 500px;
          }
        `}
      </style>
    </PageLayout>
  );
}

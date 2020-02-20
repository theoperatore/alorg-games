import * as React from 'react';
import { AppHead } from '../components/Head';
import Link from 'next/link';
import { Game } from '../components/Game';
import { PageLayout } from '../components/PageLayout';
import { useGames } from '../lib/useGames';

const Index = () => {
  const games = useGames();

  // maybe we should do some neat loading things.
  if (!games) return null;

  const { inprogress, beaten, ondeck, setaside } = games;
  return (
    <>
      <AppHead title="Games" />
      <PageLayout>
        <h1>
          In progress
          <Link href="/admin">
            <a className="admin-link">Admin</a>
          </Link>
        </h1>
        <small>Little by little.</small>
        <div className="game-container">
          {inprogress.map(game => (
            <div key={game.id} className="container">
              <Game game={game} />
            </div>
          ))}
        </div>
        <h1>On deck</h1>
        <small>A few games to keep an eye on.</small>
        <div className="game-container">
          {ondeck.map(game => (
            <div key={game.id} className="container">
              <Game game={game} />
            </div>
          ))}
        </div>
        <h1>Beaten</h1>
        <small>Sometimes for story, somtimes for glory.</small>
        <div className="game-container">
          {beaten.map(game => (
            <div key={game.id} className="container">
              <Game game={game} />
            </div>
          ))}
        </div>
        <h1>Set aside</h1>
        <small>
          Either just not for me or something else took my attention away.
        </small>
        <div className="game-container">
          {setaside.map(game => (
            <div key={game.id} className="container">
              <Game game={game} />
            </div>
          ))}
        </div>
        <footer>
          @2020{' '}
          <Link href="/why">
            <a>wat dis?</a>
          </Link>{' '}
          <Link href="/admin">
            <a className="admin-link">Admin</a>
          </Link>
        </footer>
        <style jsx>{`
          .game-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 8px 0;
          }
          .container {
            width: 375px;
            min-width: 375px;
            margin-right: 8px;
            margin-bottom: 8px;
          }
          .admin-link {
            color: white;
          }

          @media (max-width: 400px) {
            .container {
              width: 100%;
              min-width: 0;
              margin-right: 0;
            }
          }
        `}</style>
      </PageLayout>
    </>
  );
};

export default Index;

import * as React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { getDb } from '../lib/getDb';
import { Game } from '../components/Game';
import { PageLayout } from '../components/PageLayout';
import { AppHead } from '../components/Head';

export type GameType = {
  id: string;
  name: string;
  platform: string;
  comment?: string;
  image: string;
  gbid: string;
};

type Props = {
  inprogress: GameType[];
  beaten: GameType[];
  ondeck: GameType[];
  setaside: GameType[];
};

const Index: NextPage<Props> = props => {
  const { inprogress, beaten, ondeck, setaside } = props;
  return (
    <>
      <AppHead title="Games" />
      <PageLayout>
        <h1>In progress</h1>
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
          @2019{' '}
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

Index.getInitialProps = async () => {
  const db = await getDb();
  const [inprogressRef, ondeckRef, beatenRef, setasideRef] = await Promise.all([
    db
      .collection('inprogress')
      .orderBy('date_added', 'desc')
      .get(),
    db
      .collection('ondeck')
      .orderBy('date_added', 'desc')
      .get(),
    db
      .collection('beaten')
      .orderBy('date_added', 'desc')
      .get(),
    db
      .collection('setaside')
      .orderBy('date_added', 'desc')
      .get(),
  ]);

  const inprogress: GameType[] = inprogressRef.docs.map<GameType>(doc => ({
    id: doc.id,
    name: doc.get('name'),
    platform: doc.get('platform'),
    comment: doc.get('comment'),
    gbid: doc.get('gbid'),
    image: doc.get('image'),
  }));
  const ondeck: GameType[] = ondeckRef.docs.map<GameType>(doc => ({
    id: doc.id,
    name: doc.get('name'),
    platform: doc.get('platform'),
    comment: doc.get('comment'),
    gbid: doc.get('gbid'),
    image: doc.get('image'),
  }));
  const beaten: GameType[] = beatenRef.docs.map<GameType>(doc => ({
    id: doc.id,
    name: doc.get('name'),
    platform: doc.get('platform'),
    comment: doc.get('comment'),
    gbid: doc.get('gbid'),
    image: doc.get('image'),
  }));
  const setaside: GameType[] = setasideRef.docs.map<GameType>(doc => ({
    id: doc.id,
    name: doc.get('name'),
    platform: doc.get('platform'),
    comment: doc.get('comment'),
    gbid: doc.get('gbid'),
    image: doc.get('image'),
  }));
  return {
    inprogress,
    beaten,
    ondeck,
    setaside,
  };
};

export default Index;

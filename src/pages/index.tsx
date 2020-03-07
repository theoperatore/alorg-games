import * as React from 'react';
import { AppHead } from '../components/Head';
import styled from 'styled-components';
import Link from 'next/link';
import { Game } from '../components/Game';
import { PageLayout } from '../components/PageLayout';
import { useGames } from '../lib/useGames';
import { LoadingTitle, LoadingSubtitle } from '../components/LoadingTitle';
import { LoadingGame } from '../components/LoadingGame';

const Container = styled.div`
  width: 375px;
  min-width: 375px;
  margin-right: 8px;
  margin-bottom: 8px;

  @media (max-width: 400px) {
    width: 100%;
    min-width: 0;
    margin-right: 0;
  }
`;

const GamesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 8px 0;
`;

const AdminLink = styled.a`
  color: white;
`;

const Index = () => {
  const games = useGames();

  if (!games) {
    return (
      <>
        <AppHead title="Games" />
        <PageLayout>
          <LoadingTitle />
          <LoadingSubtitle />
          <GamesContainer>
            <Container>
              <LoadingGame />
            </Container>
            <Container>
              <LoadingGame />
            </Container>
            <Container>
              <LoadingGame />
            </Container>
          </GamesContainer>
          <LoadingTitle />
          <LoadingSubtitle />
          <GamesContainer>
            <Container>
              <LoadingGame />
            </Container>
            <Container>
              <LoadingGame />
            </Container>
            <Container>
              <LoadingGame />
            </Container>
          </GamesContainer>
          <LoadingTitle />
          <LoadingSubtitle />
          <GamesContainer>
            <Container>
              <LoadingGame />
            </Container>
            <Container>
              <LoadingGame />
            </Container>
            <Container>
              <LoadingGame />
            </Container>
          </GamesContainer>
        </PageLayout>
      </>
    );
  }

  const { inprogress, beaten, ondeck, setaside } = games;
  return (
    <>
      <AppHead title="Games" />
      <PageLayout>
        <h1>
          In progress
          <Link href="/admin">
            <AdminLink>Admin</AdminLink>
          </Link>
        </h1>
        <small>Little by little.</small>
        <GamesContainer>
          {inprogress.map(game => (
            <Container key={game.id}>
              <Game game={game} />
            </Container>
          ))}
        </GamesContainer>
        <h1>On deck</h1>
        <small>A few games to keep an eye on.</small>
        <GamesContainer>
          {ondeck.map(game => (
            <Container key={game.id}>
              <Game game={game} />
            </Container>
          ))}
        </GamesContainer>
        <h1>Beaten</h1>
        <small>Sometimes for story, somtimes for glory.</small>
        <GamesContainer>
          {beaten.map(game => (
            <Container key={game.id}>
              <Game game={game} />
            </Container>
          ))}
        </GamesContainer>
        <h1>Set aside</h1>
        <small>
          Either just not for me or something else took my attention away.
        </small>
        <GamesContainer>
          {setaside.map(game => (
            <Container key={game.id}>
              <Game game={game} />
            </Container>
          ))}
        </GamesContainer>
        <footer>
          @2020{' '}
          <Link href="/why">
            <a>wat dis?</a>
          </Link>{' '}
          <Link href="/admin">
            <AdminLink>Admin</AdminLink>
          </Link>
        </footer>
      </PageLayout>
    </>
  );
};

export default Index;

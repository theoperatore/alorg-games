import * as React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import useSWR from 'swr';
import unfetch from 'isomorphic-unfetch';
import { AppHead } from '../components/Head';
import { Game } from '../components/Game';
import { PageLayout } from '../components/PageLayout';
import { GamesList } from '../lib/ssr/LoadGamesSSR';

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

async function fetchGames() {
  const response = await unfetch('/api/games');
  const data = await response.json();
  return data.games as GamesList;
}

type Props = {
  games: GamesList;
};

const Index = (props: Props) => {
  const { data } = useSWR('/api/games', fetchGames, {
    initialData: props.games,
  });

  React.useEffect(() => {
    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target as HTMLImageElement;
              const imgSrc = lazyImage.dataset.src;
              if (imgSrc) {
                lazyImage.src = imgSrc;
              }

              lazyImage.classList.remove('lazy');
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        },
        {
          rootMargin: '0px 0px 100px 0px',
        },
      );

      const lazyImages = document.querySelectorAll('img.lazy');
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
  }, []);

  // since we're providing initialData from the SSR data,
  // "data" should never be undefined even if there is background
  // fetching and syncing happening. Therefore the `!` after `data`
  // should be safe!
  const { inprogress, beaten, ondeck, setaside } = data!;

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
              <Game game={game} lazy />
            </Container>
          ))}
        </GamesContainer>
        <h1>Beaten</h1>
        <small>Sometimes for story, somtimes for glory.</small>
        <GamesContainer>
          {beaten.map(game => (
            <Container key={game.id}>
              <Game game={game} lazy />
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
              <Game game={game} lazy />
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

Index.getInitialProps = async () => {
  const { LoadGamesSSR } = await import('../lib/ssr/LoadGamesSSR');
  const games = await LoadGamesSSR.load(0);
  return { games };
};

export default Index;

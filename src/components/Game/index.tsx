import * as React from 'react';
import styled from 'styled-components';
import { GiantBombGame } from '../../lib/giantbomb';
import { GameType } from '../../lib/ssr/LoadGamesSSR';

const Container = styled.div`
  position: relative;
  height: 450px;
  width: 100%;
  border-radius: 12px;
  color: #fff;
  overflow: hidden;

  background-color: #333;
`;

const Image = styled.img`
  color: #333;
  position: absolute;
  top: 0;
  left: 0;
  height: 450px;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 12px;
  cursor: pointer;
`;

const Platform = styled.small`
  color: #d9d9d9;
`;

const Name = styled.h2`
  padding-bottom: 12px;
`;

type Props = {
  game: GameType;
  lazy?: boolean;
};

export function Game({ game, lazy }: Props) {
  const [details, setDetails] = React.useState<GiantBombGame | null>(null);
  const [loadDetails, setLoadDetails] = React.useState(false);
  React.useEffect(() => {
    if (loadDetails) {
      fetch(`/api/details?id=${game.gbid}`)
        .then(r => r.json())
        .then(response => {
          setDetails(response);
        });
    }
  }, [loadDetails, game.gbid]);

  React.useEffect(() => {
    if (details) {
      alert(details.deck);
    }
  }, [details]);

  function handleDetails() {
    if (!details) {
      setLoadDetails(true);
    } else {
      alert(details.deck);
    }
  }

  return (
    <Container>
      <Image
        className={lazy ? 'lazy' : undefined}
        src={lazy ? '' : game.image}
        data-src={game.image}
        alt={`${game.name} cover art`}
        title={game.name}
        height={450}
        width="auto"
        loading={lazy ? 'lazy' : undefined}
      />
      <Overlay />
      <Content onClick={handleDetails}>
        <Platform>{game.platform}</Platform>
        <Name>{game.name}</Name>
        <p>{game.comment}</p>
      </Content>
    </Container>
  );
}

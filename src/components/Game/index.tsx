import * as React from 'react';
import styled from 'styled-components';
import { GiantBombGame } from '../../lib/giantbomb';
import { GameType } from '../../lib/ssr/LoadGamesSSR';

const Container = styled.div<{ image: string }>`
  position: relative;
  height: 450px;
  width: 100%;
  border-radius: 12px;
  color: #fff;

  padding: 12px;
  display: flex;
  align-items: flex-end;

  background-color: #333;
  background-image: url(${props => props.image});
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)),
    url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Platform = styled.small`
  color: #d9d9d9;
  padding: 0;
  margin: 0;
`;

const Name = styled.h2`
  padding: 0;
  margin: 0;
`;

const DetailsIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: absolute;
  top: 0;
  right: 0;

  font-family: monospace;
  font-size: 1.5em;
  cursor: pointer;
`;

type Props = {
  game: GameType;
};

export function Game({ game }: Props) {
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

  return (
    <Container image={game.image}>
      <div>
        <div>
          <Platform>{game.platform}</Platform>
          <Name>{game.name}</Name>
        </div>
        <p>{game.comment}</p>
      </div>
      <DetailsIcon
        onClick={() => {
          if (!details) {
            setLoadDetails(true);
          } else {
            alert(details.deck);
          }
        }}
      >
        (i)
      </DetailsIcon>
    </Container>
  );
}

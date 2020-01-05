import * as React from 'react';
import styled from 'styled-components';
import { GameType } from '../../pages';

const Container = styled.div<{ image: string }>`
  height: 450px;
  width: 100%;
  border-radius: 12px;
  color: #fff;

  padding: 12px;
  display: flex;
  align-items: flex-end;

  background-image: url(${props => props.image});
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)),
    url(${props => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  transition: transform 300ms ease;

  &:hover,
  &:active {
    transform: scale(0.97);
  }
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

type Props = {
  game: GameType;
};

export function Game({ game }: Props) {
  return (
    <Container image={game.image}>
      <div>
        <div>
          <Platform>{game.platform}</Platform>
          <Name>{game.name}</Name>
        </div>
        <p>{game.comment}</p>
      </div>
    </Container>
  );
}

import * as React from 'react';
import { GameType } from '../../pages';

type Props = {
  game: GameType;
};

export function Game({ game }: Props) {
  return (
    <div className="container">
      <div className="game">
        <div className="title">
          <small className="platform">{game.platform}</small>
          <h2 className="name">{game.name}</h2>
        </div>
        <p>{game.comment}</p>
      </div>
      <div></div>
      <style jsx>{`
        .container {
          height: 450px;
          width: 100%;
          border-radius: 12px;
          color: #fff;

          padding: 12px;
          display: flex;
          align-items: flex-end;

          background-image: url(${game.image});
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.1),
              rgba(0, 0, 0, 0.9)
            ),
            url(${game.image});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }

        .name,
        .platform {
          padding: 0;
          margin: 0;
        }

        .platform {
          color: #d9d9d9;
        }
      `}</style>
    </div>
  );
}

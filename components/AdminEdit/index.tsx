import * as React from 'react';
import { Game } from '../Game';
import { Alert } from '../Alert';

type EditGame = {
  id: string;
  name: string;
  platform: string;
  comment?: string;
  category: string;
  gbid: string;
  image: string;
};

type Props = {};

export function AdminEdit(props: Props) {
  const [cache, setCache] = React.useState(1);
  const [games, setGames] = React.useState<EditGame[]>([]);
  const [isLoading, setLoading] = React.useState(false);
  const [isSaving, setSaving] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(false);
  const [game, setGame] = React.useState<null | EditGame>(null);
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    let isActive = true;

    setLoading(true);
    fetch('/api/games')
      .then(r => r.json())
      .then(data => {
        if (isActive) {
          setLoading(false);
          setGames(data);
        }
      });

    return () => {
      isActive = false;
    };
  }, [cache]);

  function stageGame(game: EditGame | null) {
    if (!game) {
      setGame(null);
      return;
    }

    setGame(game);
    setName(game.name);
    setCategory(game.category);
    setComment(game.comment || '');
  }

  function reload() {
    setCache(c => c + 1);
  }

  function handleAdd() {
    if (!game) return;

    const payload = {
      game: {
        category,
        comment,
      },
      id: game.id,
    };

    setSaving(true);
    fetch('/api/games', { method: 'PUT', body: JSON.stringify(payload) }).then(
      response => {
        if (response.ok) {
          setGame(null);
          setSaving(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 2500);
        }
      },
    );
  }

  return (
    <>
      <Alert show={isSuccess} variant="success">
        Updated game
      </Alert>
      <div className="mb-4">
        <div className="mb-3">
          <h3 className="mb-3">Edit a game</h3>
        </div>
        <select
          value={game ? game.id : '-'}
          onChange={e =>
            stageGame(games.find(g => g.id === e.target.value) || null)
          }
        >
          {isLoading && (
            <option disabled value="-">
              Loading...
            </option>
          )}
          {!isLoading && games.length && (
            <option disabled value="-">
              Select a game
            </option>
          )}
          {games.map(game => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
        <div className="mt-2 mb-3">
          <button className="btn btn-light btn-sm" onClick={reload}>
            Reload games
          </button>
        </div>
        <div className="mb-3">
          {game && (
            <div>
              <div className="game-preview-container">
                <Game
                  game={{
                    comment,
                    name,
                    platform: game.platform,
                    gbid: game.gbid,
                    id: game.id,
                    image: game.image,
                  }}
                />
              </div>
              {/* form */}
              <div className="mb-3">
                <h4 className="mb-1">Category</h4>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="inprogress"
                    type="radio"
                    name="category"
                    value="inprogress"
                    checked={category === 'inprogress'}
                    onChange={ev => setCategory(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="inprogress">
                    In progress
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="beaten"
                    type="radio"
                    name="category"
                    value="beaten"
                    checked={category === 'beaten'}
                    onChange={ev => setCategory(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="beaten">
                    Beaten
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="ondeck"
                    type="radio"
                    name="category"
                    value="ondeck"
                    checked={category === 'ondeck'}
                    onChange={ev => setCategory(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="ondeck">
                    On deck
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="setaside"
                    type="radio"
                    name="category"
                    value="setaside"
                    checked={category === 'setaside'}
                    onChange={ev => setCategory(ev.target.value)}
                  />
                  <label className="form-check-label" htmlFor="setaside">
                    Set aside
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <h4 className="mb-1">Comment</h4>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Comment on this game"
                  value={comment}
                  onChange={ev => setComment(ev.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <button
                  disabled={isSaving}
                  type="button"
                  className="btn btn-success"
                  onClick={handleAdd}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .game-preview-container {
            width: 375px;
          }
          @media (max-width: 400px) {
            .game-preview-container {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}

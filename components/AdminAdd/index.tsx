import * as React from 'react';
import { GameSearch } from '../GameSearch/ index';
import { Game } from '../Game';
import { GiantBombSearchResult } from '../../lib/giantbomb';
import { Alert } from '../Alert';
import { useGamesPost, GameToSave } from '../../lib/useGamesPost';

export function AdminAdd() {
  const [isSaving, setSaving] = React.useState(false);
  const [showSuccess, setSuccess] = React.useState(false);
  const [game, setGame] = React.useState<null | GiantBombSearchResult>(null);
  const [selectedPlatform, setPlatform] = React.useState('');
  const [category, setCategory] = React.useState('inprogress');
  const [comment, setComment] = React.useState('');
  const postGame = useGamesPost();

  function reset() {
    setGame(null);
    setPlatform('');
    setCategory('inprogress');
    setComment('');
  }

  function handleGameSelect(selected: GiantBombSearchResult) {
    setGame(selected);
    setPlatform('');
    setCategory('inprogress');
    setComment('');
  }

  function handleAdd() {
    if (!game || !selectedPlatform) return;

    const gameToSave: GameToSave = {
      name: game.name,
      platform: selectedPlatform,
      gbid: game.id,
      image:
        game.image.original_url ||
        game.image.screen_large_url ||
        game.image.screen_url ||
        game.image.super_url ||
        game.image.medium_url ||
        game.image.small_url ||
        game.image.thumb_url ||
        game.image.tiny_url ||
        '',
      comment,
      category,
    };

    setSaving(true);
    postGame(gameToSave).then(response => {
      setSaving(false);
      if (response === 'success') {
        reset();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
      }
    });
  }
  return (
    <>
      <Alert show={showSuccess} variant="success">
        <strong>Saved game to db</strong>
      </Alert>
      <div className="mb-4">
        <div className="mb-3">
          <h3 className="mb-3">Add a game</h3>
          <GameSearch onSelected={handleGameSelect} />
        </div>
        {game && (
          <div className="">
            <div className="game-preview-container">
              <Game
                game={{
                  image: game.image.original_url,
                  comment,
                  id: 'demo',
                  gbid: game.id,
                  name: game.name,
                  platform: selectedPlatform,
                }}
              />
            </div>
            <h3 className="mb-3">{game.name}</h3>
            <div className="mb-3">
              <h4 className="mb-1">Platforms</h4>
              {!game.platforms && <div>No Platforms</div>}
              {game.platforms &&
                game.platforms.map(platform => (
                  <div key={platform.id} className="form-check">
                    <input
                      className="form-check-input"
                      id={platform.name}
                      type="radio"
                      name="platform"
                      value={platform.name}
                      checked={selectedPlatform === platform.abbreviation}
                      onChange={() => setPlatform(platform.abbreviation)}
                    />
                    <label className="form-check-label" htmlFor={platform.name}>
                      {platform.name}
                    </label>
                  </div>
                ))}
            </div>
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
                Add to collection
              </button>
            </div>
          </div>
        )}
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

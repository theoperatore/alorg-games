import * as React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import Head from 'next/head';
import { PageLayout } from '../components/PageLayout';
import { GameSearch } from '../components/GameSearch/ index';
import { GiantBombSearchResult } from '../lib/giantbomb';
import { useUser } from '../lib/useUser';

const Admin: NextPage = () => {
  const user = useUser();

  React.useEffect(() => {
    if (!user.isLoading) {
      if (!user.isLoggedIn) {
        Router.push('/login');
      }
    }
  }, [user, user.isLoggedIn, user.isLoading]);

  const [game, setGame] = React.useState<null | GiantBombSearchResult>(null);
  const [selectedPlatform, setPlatform] = React.useState('');
  const [category, setCategory] = React.useState('inprogress');
  const [comment, setComment] = React.useState('');
  const [isSaving, setSaving] = React.useState(false);
  const [showSuccess, setSuccess] = React.useState(false);

  function handleGameSelect(selected: GiantBombSearchResult) {
    setGame(selected);
    setPlatform('');
    setCategory('inprogress');
    setComment('');
  }

  function handleAdd() {
    if (!game || !selectedPlatform) return;

    const payload = {
      game: {
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
          null,
        comment,
      },
      category,
    };

    setSaving(true);
    fetch('/api/games', {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then(response => {
      setSaving(false);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
      }
    });
  }

  if (user.isLoading) {
    return (
      <PageLayout>
        <Head>
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            // integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            // crossorigin="anonymous"
          ></link>
          <title>Admin</title>
        </Head>
        <p>verifying user...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          // integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          // crossorigin="anonymous"
        ></link>
        <title>Admin</title>
      </Head>
      <div className="mb-4">
        <h1>Admin the db</h1>
        <Link href="/">
          <a title="View games">View games</a>
        </Link>
      </div>
      <div className="mb-4">
        <div className="mb-3">
          <h3 className="mb-3">Add a game</h3>
          <GameSearch onSelected={handleGameSelect} />
        </div>
        {game && (
          <div className="">
            {showSuccess && (
              <div className="alert alert-success">Saved game to db</div>
            )}
            <div className="row">
              <div className="col">
                <img src={game.image.original_url} className="img-thumbnail" />
              </div>
              <div className="col">
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
                        <label
                          className="form-check-label"
                          htmlFor={platform.name}
                        >
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
            </div>
          </div>
        )}
      </div>
      {/* <div className="mb-4">
        <div className="mb-3">
          <h3 className="mb-3">Move a game</h3>
        </div>
      </div> */}
    </PageLayout>
  );
};

export default Admin;

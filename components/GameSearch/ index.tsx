import * as React from 'react';
import { useDebounce } from '../../lib/useDebounce';
import { GiantBombSearchResult } from '../../lib/giantbomb';

type Props = {
  onSelected: (selected: GiantBombSearchResult) => void;
};

export function GameSearch(props: Props) {
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const dSearch = useDebounce(search, 300);
  const [results, setResults] = React.useState<GiantBombSearchResult[]>([]);
  const ref = React.useRef<HTMLInputElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    function handleOutsideClick(ev: any) {
      if (ref.current && ref.current.contains(ev.target)) {
        return;
      }
      if (inputRef.current && inputRef.current.contains(ev.target)) {
        return;
      }

      setShow(false);
    }

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  });

  React.useEffect(() => {
    let isValid = true;

    if (dSearch) {
      const term = encodeURIComponent(dSearch);
      fetch(`/api/search?q=${term}`)
        .then(response => response.json())
        .then((obj: { results: GiantBombSearchResult[] }) => {
          if (isValid) {
            setShow(true);
            setResults(obj.results);
          }
        });
    }

    return () => {
      isValid = false;
    };
  }, [dSearch]);

  function handleSelect(item: GiantBombSearchResult) {
    setShow(false);
    setSearch('');
    props.onSelected(item);
  }

  return (
    <div className="wrapper">
      <input
        ref={inputRef}
        className="form-control"
        value={search}
        onChange={ev => setSearch(ev.target.value)}
        placeholder="Search a game to add..."
        onFocus={() => setShow(true)}
      />
      {show && (
        <div ref={ref} className="results shadow mb-5 bg-white rounded">
          {results.map(result => (
            <div
              key={result.id}
              className="result-item p-3"
              onClick={() => handleSelect(result)}
            >
              <p style={{ fontWeight: 'bold' }}>{result.name}</p>
              {!result.platforms && <small className="text-muted">N/A</small>}
              {result.platforms && (
                <small className="text-muted">
                  {result.platforms.map(p => p.name).join(', ')}
                </small>
              )}
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .wrapper {
          position: relative;
          max-width: 500px;
        }

        .input {
          appearance: none;
          position: relative;
          width: 100%;
          border: 0;
        }

        .results {
          position: absolute;
          z-index: 1;

          max-height: 150px;
          overflow-y: auto;
          overflow-x: hidden;
          margin-top: 8px;

          width: 100%;
        }

        .result-item:hover {
          width: 100%;
          background-color: rgba(51, 51, 51, 0.05);
          cursor: default;
        }
      `}</style>
    </div>
  );
}

// Collection.tsx

import React, { useState, useEffect } from 'react';
import { fetchCollection, Player } from '../lib/collection';
import './Collection.css';

export const Collection: React.FC = () => {
  const [collection, setCollection] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(function () {
    function fetchData() {
      fetchCollection()
        .then(function (data) {
          setCollection(data);
        })
        .catch(function (error) {
          setError('Failed to fetch collection.');
        });
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      {loading && <div className="LoadingIndicator">Loading...</div>}
      {error && <div className="ErrorIndicator">{error}</div>}
      {!loading && !error && (
        <div className="CardContainer">
          {collection.map((player) => (
            <div key={player.id} className="Card">
              <img
                src={player?.player?.image}
                alt={`${player?.player?.firstname || ''} ${
                  player?.player?.lastname || ''
                }`}
              />
              <div>
                <h5>{`${player?.player?.firstname || ''} ${
                  player?.player?.lastname || ''
                }`}</h5>
                <p>
                  Date of Birth:{' '}
                  {new Date(
                    player?.player?.birthday || ''
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collection;

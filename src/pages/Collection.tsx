import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { fetchCollection } from '../lib/collection';

import { Loader } from '../components/Loader/Loader';

import './Collection.css';

// interface Player {
//   id: number;
//   firstname: string;
//   lastname: string;
//   birthday: string;
//   image: string;
// }

// interface Card {
//   id: number;
//   player: Player;
// }

export const Collection = () => {
  const collection = fetchCollection();
  const card = collection[0];
  const [isImageLoaded, setImageLoaded] = useState(false);
  const { player } = card;
  const birthdate: Date = new Date(player.birthday);

  return (
    <div className="card">
      <div className="go-back">
        <Link to="/">{`\<`} Back </Link>
      </div>
      <div className="card-container">
        <p>{player.firstname}</p>
        <p>{player.lastname}</p>
        <div>
          <p>
            Birthday:
            {birthdate.toLocaleDateString('default', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <div>
          <Loader loading={isImageLoaded} size={'small'}>
            <img className="player-img" src={player.image} loading="lazy" />
          </Loader>
        </div>
      </div>
    </div>
  );
};

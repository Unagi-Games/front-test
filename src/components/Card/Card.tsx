import React from 'react';
import { Data } from '../../types';

import { constructImgUrl } from '../../utils/getUrl';

import './Card.css';

export const Card: React.FC<Data> = ({ player, id }) => {
  const birthdate: Date = new Date(player.birthday);
  const url = constructImgUrl(player.image, id.toString());
  return (
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
        <img className="player-img" src={url} loading="lazy" />
      </div>
    </div>
  );
};

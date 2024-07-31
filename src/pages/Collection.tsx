import React from 'react';

import { fetchCollection } from '../lib/collection';
import { Card } from '../types';
export const Collection = () => {
  const collection: Card[] = fetchCollection();
  const card: Card = collection[0];

  return (
    <div className="card-container">
      <div className="card">
        <img
          className="card-image"
          src={
            'https://images.fotmob.com/image_resources/playerimages/' +
            card.id +
            '.png'
          }
          alt={`${card.player.firstname} ${card.player.lastname}`}
        />
        <div className="card-body">
          <h5 className="card-title">
            {card.player.firstname} {card.player.lastname}
          </h5>
          <p className="card-text">
            Birthday: {new Date(card.player.birthday).toLocaleDateString()}
          </p>
          <p className="card-id">ID: {card.id}</p>
        </div>
      </div>
    </div>
  );
};

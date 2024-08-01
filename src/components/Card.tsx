import React from 'react';
import { Player, Card as CardProps } from '../types';

const Card: React.FC<CardProps> = ({ id, player }) => {
  return (
    <div className="card">
      <img
        className="card-image"
        src={`https://images.fotmob.com/image_resources/playerimages/${id}.png`}
        alt={`${player.firstname} ${player.lastname}`}
      />
      <div className="card-body">
        <h5 className="card-title">
          {player.firstname} {player.lastname}
        </h5>
        <p className="card-text">
          Birthday: {new Date(player.birthday).toLocaleDateString()}
        </p>
        <p className="card-id">ID: {id}</p>
      </div>
    </div>
  );
};

export default Card;

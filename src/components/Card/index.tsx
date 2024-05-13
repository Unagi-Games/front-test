import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ICard } from "../../types/Card";
import './index.css';

export const Card: React.FC<{ card: ICard }> = ({ card}) => {
  return (
    <div className="card">
      <LazyLoadImage
        src={`https://images.fotmob.com/image_resources/playerimages/${card.id}.png`}
        alt={`${card.player.firstname} ${card.player.lastname}`}
        effect="blur"
        placeholder={<div>Loading...</div>}
      />
      <div>
        <p>{card.player.firstname} {card.player.lastname}</p>
        <p>{new Date(card.player.birthday).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

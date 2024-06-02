import React from 'react'
import Card from '../types/interfaces/Card';
import { LazyImage } from './LazyImage';

export const Card = (card: Card) => {


    const generateImageUrl = (id: number) => `https://images.fotmob.com/image_resources/playerimages/${id}.png`;

    const imageUrl = generateImageUrl(card.id);

    return (
        <div>
            <LazyImage src={imageUrl} alt={`${card.player.firstname} ${card.player.lastname}`} />
            <h2>{card.player.firstname} {card.player.lastname}</h2>
            <p>DOB: {card.player.birthday}</p>
        </div>
    );
}
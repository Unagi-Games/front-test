import React from 'react'
import Card from '../types/interfaces/Card';
import { LazyImage } from './LazyImage';
import styled from 'styled-components';

interface CardComponentProps {
    card: Card;
}

export const CardComponent = ({ card }: CardComponentProps) => {


    const generateImageUrl = (id: number) => `https://images.fotmob.com/image_resources/playerimages/${id}.png`;

    const imageUrl = generateImageUrl(card.id);

    return (
        <CardWrapper>
            <LazyImage src={imageUrl} alt={`${card.player.firstname} ${card.player.lastname}`} />
            <h2>{card.player.firstname} {card.player.lastname}</h2>
            <p>DOB: {card.player.birthday}</p>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
`;
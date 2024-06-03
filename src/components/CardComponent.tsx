import React from 'react'
import Card from '../types/interfaces/Card';
import { LazyImage } from './LazyImage';
import styled from 'styled-components';
import { format } from 'date-fns';

interface CardComponentProps {
    card: Card;
}

export const CardComponent = ({ card }: CardComponentProps) => {


    const generateImageUrl = (id: number) => `https://images.fotmob.com/image_resources/playerimages/${id}.png`;

    const imageUrl = generateImageUrl(card.id);

    // Format the birthday using date-fns
    const formattedDOB = format(new Date(card.player.birthday), 'MMMM do, yyyy');

    return (
        <CardWrapper>
            <LazyImage src={imageUrl} alt={`${card.player.firstname} ${card.player.lastname}`} />
            <H2>{card.player.firstname} {card.player.lastname}</H2>
            <DOB>DOB: {formattedDOB}</DOB>
        </CardWrapper>
    );
}

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #4d4d4d;
  padding: 16px;
  margin: 16px;
  background-color:#1d1e22;
  border-radius: 8px;
  box-shadow: 0 5px 30px rgba(1, 1, 1, 0.3);
`;

const H2 = styled.h2`
margin-top:.3rem;
`;

const DOB = styled.p`
margin-top:.3rem;
font-size:.8rem;
`;
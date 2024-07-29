import React, { useState } from 'react';
import styled from 'styled-components';
import { CardData } from '../types';
import PlayerIcon from '../assets/images/svg/manIcon.svg';

interface CardProps {
  card: CardData;
}

const CardContainer = styled.div`
  width: 240px;
  max-height: 320px;
  border-radius: 12px;
  transition: box-shadow 0.3s ease;
  background-color: white;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const CardImage = styled.img`
  width: 200px;
  height: 200px;
  background-color: #faf9f6;
  border-radius: 12px;
  margin: 8px;
`;

const TextWrapper = styled.div`
  display: flex;
  gap: 4px;
  text-align: left;
  margin-top: 4px;
  margin-bottom: 12px;
`;

const Title = styled.div`
  color: black;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
`;

const Description = styled.div`
  color: black;
  font-weight: normal;
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
`;

const CardComponent: React.FC<CardProps> = ({ card }) => {
  const [imageNotFound, setImageNotFound] = useState(false);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <CardContainer>
      <CardWrapper>
        <CardImage
          src={`https://images.fotmob.com/image_resources/playerimages/${card.id}.png`}
          onError={() => setImageNotFound(true)}
          alt="player image"
          style={{ display: imageNotFound ? 'none' : 'block' }}
        />
        {imageNotFound && <CardImage src={PlayerIcon} alt="player image" />}

        <Description>{`${card.player.firstname} ${card.player.lastname}`}</Description>

        <TextWrapper>
          <Title>DOB:</Title>
          <Description>{formatDate(card.player.birthday)}</Description>
        </TextWrapper>
      </CardWrapper>
    </CardContainer>
  );
};

export default CardComponent;

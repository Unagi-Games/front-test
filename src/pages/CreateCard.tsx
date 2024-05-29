import React, { useState } from 'react';
import styled from 'styled-components';
import { Player } from '../types';
import { formatDate } from '../utils';

interface CreateCardProps {
  player: Player;
}

const CardContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const CardDetails = styled.div`
  margin-top: 16px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LazyImage = styled.img<{ loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${({ loaded }) => (loaded ? 'block' : 'none')};
`;

const CreateCard: React.FC<CreateCardProps> = ({ player }) => {
  const [loaded, setLoaded] = useState(false);
  console.log('player', player);

  return (
    <CardContainer>
      <ImageContainer>
        {!loaded && <LoadingIndicator>Loading...</LoadingIndicator>}
        <LazyImage
          src={`https://images.fotmob.com/image_resources/playerimages/${player?.id}.png`}
          alt={`${player?.firstname} ${player?.lastname}`}
          onLoad={() => setLoaded(true)}
          loaded={loaded}
        />
      </ImageContainer>
      <CardDetails>
        <h2>{`${player?.firstname} ${player?.lastname}`}</h2>
        <p>DOB: {formatDate(player?.birthday)}</p>
      </CardDetails>
    </CardContainer>
  );
};

export default CreateCard;

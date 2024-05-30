import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CreateCard from './CreateCard';
import { Card } from '../types';

const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loading = styled.div`
  margin: 20px;
`;

const Error = styled.div`
  color: red;
  margin: 20px;
`;

const fetchCollection = async (): Promise<Card[]> => {
  const response = await fetch('http://localhost:8001/cards');
  if (!response.ok) {
    console.log('error', response);
  }
  return response.json();
};

const Collection: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCollection = async () => {
      try {
        const data = await fetchCollection();
        console.log('data', data);
        setCards(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadCollection();
  }, []);

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>Error: {error}</Error>;
  }

  return (
    <CollectionContainer>
      {cards.map((card) => (
        <CreateCard key={card.id} player={card.player} />
      ))}
    </CollectionContainer>
  );
};

export default Collection;

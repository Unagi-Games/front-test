import React, { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/collection';
import './Collection.css';
import Card from '../types/interfaces/Card';
import { CardComponent } from '../components/CardComponent';
import styled from 'styled-components';



export const Collection = () => {

  const [collection, setCollection] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCollection = async () => {
      try {
        const data = await fetchCollection();
        setCollection(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getCollection();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (collection.length === 0) {
    return <div>No cards available</div>;
  }


  return (
    <CollectionWrapper>
      
      <GridWrapper>
        {collection.map(card => (
          <CardComponent key={card.id} card={card} />
        ))}
      </GridWrapper>
    </CollectionWrapper>
  );


};

const CollectionWrapper = styled.div`
  padding: 16px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;
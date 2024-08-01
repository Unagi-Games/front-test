import React, { useEffect, useState } from 'react';

import { Card as CardProps } from '../types';
import { fetchCollection } from '../lib/collection';
import './Collection.css';
import Card from '../components/Card';

export const Collection: React.FC = () => {
  const [collection, setCollection] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCollection = async () => {
      try {
        const data = await fetchCollection();
        setCollection(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getCollection();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (collection.length === 0) {
    return <div>No cards available</div>;
  }

  return (
    <div className="card-container">
      {collection.map((item) => {
        return <Card id={item.id} player={item.player} />;
      })}
    </div>
  );
};

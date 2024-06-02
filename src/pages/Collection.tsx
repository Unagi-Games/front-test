import React, { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/collection';
import { LazyImage } from '../components/LazyImage'
import './Collection.css';
import Card from '../types/interfaces/Card';
import { CardComponent } from '../components/CardComponent';



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
    <div className="collection">

      {collection.map(card => (
        <CardComponent key={card.id} card={card} />
      ))}
    </div>
  );


};

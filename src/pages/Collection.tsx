import React, { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/collection';

import './Collection.css';
import Card from '../types/interfaces/Card';




export const Collection = () => {

  /**
   * Step 1: Render the card
   */

  const [collection, setCollection] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCollection = async () => {
      const data = await fetchCollection();
      setCollection(data);
      setLoading(false);
    };
    getCollection();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  const card = collection[0];

  return (
    <div className="card">
      <img src={card.player.image} alt={`${card.player.firstname} ${card.player.lastname}`} />
      <h2>{card.player.firstname} {card.player.lastname}</h2>
      <p>DOB: {new Date(card.player.birthday).toLocaleDateString()}</p>
    </div>
  );


};

import React, { useEffect, useState } from 'react';

import { fetchCollection } from '../lib/collection';
import './Collection.css';
import Card from '../types/interfaces/Card';



export const Collection = () => {

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

  const generateImageUrl = (id: number) => `https://images.fotmob.com/image_resources/playerimages/${id}.png`;

  const card = collection[0];
  const imageUrl = generateImageUrl(card.id);

  return (
    <div className="card">
      <img src={imageUrl} alt={`${card.player.firstname} ${card.player.lastname}`} />
      <h2>{card.player.firstname} {card.player.lastname}</h2>
      <p>DOB: {new Date(card.player.birthday).toLocaleDateString()}</p>
    </div>
  );


};

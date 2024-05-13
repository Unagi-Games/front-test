import React, { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/collection';
import { Card } from "../components/Card";
import { ICard } from "../types/CollectionData";
import './Collection.css';

export const Collection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState<ICard[]>([]);

  const fetchData = async () => {
    try {
      const cards = await fetchCollection();
      setCards(cards);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Card card={cards[0]} />
    </>
  );
};

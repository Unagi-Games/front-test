import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { fetchCollection } from '../lib/collection';
import { Card } from "../components/Card";
import { ICard } from "../types/Card";
import './Collection.css';

export const Collection: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState<ICard[]>([]);
  const [sortCards, setSortCards] = useState<ICard[]>([]);
  const [order, setOrder] = useState("");

  const fetchData = async () => {
    try {
      const cards = await fetchCollection();
      setCards(cards);
      setSortCards(cards);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  useEffect(() => {
    if (order) {
      const sortedCards = [...cards].sort((a, b) => a.player[order].localeCompare(b.player[order]));
      setSortCards(sortedCards);
    } else {
      setSortCards(cards);
    }
  }, [order]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="collection">
      <h1 className="title">Collections</h1>

      <div className="top">
        <button onClick={() => history.push('/create-card')}>Go To Create Card Page</button>
        <div className="order">
          Order:&nbsp;&nbsp;&nbsp;
          <select value={order} onChange={(e) => setOrder(e.target.value)}>
            <option value="">Nothing</option>
            <option value="firstname">First Name</option>
            <option value="lastname">Last Name</option>
            <option value="birthday">DOB</option>
          </select>
        </div>
      </div>

      <div className="list">
        {
          sortCards.map((card: ICard) => (
            <Card key={card.id} card={card} />
          ))
        }
      </div>
    </div>
  );
};

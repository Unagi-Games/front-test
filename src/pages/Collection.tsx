import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchCollection } from '../lib/collection';
import { Loader, Card, EmptyData } from '../components/index';

import { Data } from '../types';

import './Collection.css';

export const Collection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Data[]>([]);
  const [error, setError] = useState<string | boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchCollection('http://localhost:8001/cards')
      .then((response) => {
        setCards(response);
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="cards">
        <Loader loading={isLoading}>
          {!error || !!cards.length ? (
            cards.map((card, key) => {
              console.log(card);
              return <Card player={card.player} id={card.id} key={key} />;
            })
          ) : (
            <EmptyData />
          )}
        </Loader>
      </div>
      <div className="go-back">
        <button>
          <Link to="/">Home </Link>
        </button>
      </div>
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchCollection } from '../lib/collection';
import { Loader, Card, EmptyData } from '../components/index';

import { sortfn } from '../utils/common';

import { Data } from '../types';

import './Collection.css';

export const Collection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<Data[]>([]);
  const [sortValue, setSort] = useState('');
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

  console.log(sortValue);
  const sortedCards = sortValue ? sortfn(cards, sortValue) : cards;
  console.log(sortedCards);
  return (
    <>
      <div className="sort-input">
        Sort Cards:
        <div>
          <input
            className="radio-input"
            type="radio"
            id="firstname"
            value="firstname"
            checked={sortValue === 'firstname'}
            onChange={(ev) => {
              setSort(ev.target.value);
            }}
          />
          <label htmlFor="html">First Name</label>
        </div>
        <div>
          <input
            className="radio-input"
            type="radio"
            id="lastname"
            value="lastname"
            checked={sortValue === 'lastname'}
            onChange={(ev) => setSort(ev.target.value)}
          />
          <label htmlFor="css">Last name</label>
        </div>
      </div>
      <div className="cards">
        <Loader loading={isLoading}>
          {!error || !!cards.length ? (
            sortedCards.map((card, key: number) => {
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

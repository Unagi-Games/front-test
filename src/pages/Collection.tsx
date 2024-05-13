import React from 'react';
import { fetchCollection } from '../lib/collection';
import { Card } from "../components/Card";
import './Collection.css';

export const Collection: React.FC = () => {
  const collection = fetchCollection();
  const card = collection[0];

  return (
    <>
      <Card card={card} />
    </>
  );
};

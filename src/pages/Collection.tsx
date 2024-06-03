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
  const [order, setOrder] = useState<string>('firstname');

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

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(e.target.value);
  };

  const sortedCollection = [...collection].sort((a, b) => {
    if (order === 'firstname') {
      return a.player.firstname.localeCompare(b.player.firstname);
    } else if (order === 'lastname') {
      return a.player.lastname.localeCompare(b.player.lastname);
    } else if (order === 'birthday') {
      return new Date(a.player.birthday).getTime() - new Date(b.player.birthday).getTime();
    }
    return 0;
  });


  return (
    <CollectionWrapper>

      <OrderWrapper>

        <label htmlFor="firstname">
          <input type="radio" id="firstname" value="firstname" checked={order === 'firstname'} onChange={handleOrderChange}/>
            <span className="rdo"></span>
            <span>First Name</span>
        </label>

        <label htmlFor="lastname">
          <input type="radio" id="lastname" value="lastname" checked={order === 'lastname'} onChange={handleOrderChange}/>
            <span className="rdo"></span>
            <span>Last Name</span>
        </label>

        <label htmlFor="birthday">
          <input type="radio" id='birthday'  value="birthday" checked={order === 'birthday'} onChange={handleOrderChange}/>
            <span className="rdo"></span>
            <span>Date of Birth</span>
        </label>
      </OrderWrapper>


      <GridWrapper>
        {sortedCollection.map(card => (
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

const OrderWrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 16px;
  label {
    margin: 0 10px;
    input {
      margin-right: 4px;
    }
  }
`;
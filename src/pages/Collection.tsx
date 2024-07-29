import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import styled from 'styled-components';
import { fetchCollection } from '../lib/collection';
import Spinner from '../components/common/Spinner';
import { CardData } from '../types';

import CardComponent from '../components/Card';
import Dropdown from '../components/common/Dropdown';

const CollectionContainer = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-right: 200px;
  margin-bottom: 40px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Collection: React.FC = () => {
  const [collection, setCollection] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('Default');
  const options = ['Default', 'DOB', 'First Name', 'Last Name'];

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const sortCollection = (collection: CardData[], option: string) => {
    switch (option) {
      case 'DOB':
        return collection.sort(
          (a, b) =>
            new Date(a.player.birthday).getTime() -
            new Date(b.player.birthday).getTime()
        );
      case 'First Name':
        return collection.sort((a, b) =>
          a.player.firstname.localeCompare(b.player.firstname)
        );
      case 'Last Name':
        return collection.sort((a, b) =>
          a.player.lastname.localeCompare(b.player.lastname)
        );
      default:
        return collection;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCollection();
        setCollection(sortCollection(data, selectedOption));
      } catch (err) {
        setError('Failed to fetch collection');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedOption]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <>
      <Navbar
        title="Players Collection"
        routeName="/create-card"
        buttonName="Create Card"
      />
      <Container>
        <Label htmlFor="dropdown">Select an option:</Label>
        <Dropdown
          options={options}
          selectedOption={selectedOption}
          onChange={handleDropdownChange}
        />
      </Container>
      <CollectionContainer>
        {collection.map((card) => (
          <CardComponent key={card.id} card={card} />
        ))}
      </CollectionContainer>
    </>
  );
};

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from './types';

const FormContainer = styled.div`
  padding: 16px;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin: 8px 0;
`;

const ErrorMessage = styled.div`
  color: red;
`;

const CreateCardForm: React.FC = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newCard: Card = {
      id: Date.now(),
      player: {
        id: Date.now(),
        firstname,
        lastname,
        birthday,
        image: `https://images.fotmob.com/image_resources/playerimages/${Date.now()}.png`,
      },
    };

    try {
      const response = await fetch('http://localhost:8001/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCard),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFirstname('');
      setLastname('');
      setBirthday('');
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <Input
          type="date"
          placeholder="Birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <Button type="submit">Create Card</Button>
        {error && <ErrorMessage>Error: {error}</ErrorMessage>}
      </form>
    </FormContainer>
  );
};

export default CreateCardForm;

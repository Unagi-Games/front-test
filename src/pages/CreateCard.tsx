import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Player, CardData } from '../types';
import { Navbar } from '../components/common/Navbar';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: auto;
`;

const Label = styled.label`
  margin: 10px 0 5px 0;
  font-size: 16px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
`;

const Input = styled.input`
  margin: 5px 0 10px 0;
  padding: 8px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
`;

const Button = styled.button`
  margin-top: 8px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-family: 'Poppins', sans-serif;
`;

const SuccessMessage = styled.div`
  color: green;
  margin: 10px 0;
  font-family: 'Poppins', sans-serif;
`;

const FieldError = styled.div`
  color: red;
  margin-top: 4px;
  margin-bottom: 4px;
  font-size: 12px;
  font-family: 'Poppins', sans-serif;
`;

export const CreateCard: React.FC = () => {
  const [playerData, setPlayerData] = useState<Player>({
    firstname: '',
    lastname: '',
    birthday: '',
    image: '',
  });

  const [errors, setErrors] = useState<Partial<Player>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mainError, setMainError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayerData({
      ...playerData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateFields = (): boolean => {
    const { firstname, lastname, birthday, image } = playerData;
    const newErrors: Partial<Player> = {};

    if (!firstname) newErrors.firstname = 'First Name is required.';
    if (!lastname) newErrors.lastname = 'Last Name is required.';
    if (!birthday) newErrors.birthday = 'Birthday is required.';
    if (!image) newErrors.image = 'Image URL is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const newCard: Omit<CardData, 'id'> = {
      player: playerData,
    };

    setLoading(true);
    setErrors({});
    setSuccess(null);

    try {
      await axios.post('http://localhost:8001/cards', newCard);
      setSuccess('Card created successfully');

      setPlayerData({
        firstname: '',
        lastname: '',
        birthday: '',
        image: '',
      });
    } catch (err) {
      setMainError('Failed to create card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar
        title="Create a New Card"
        routeName="/collection"
        buttonName="Card Collection"
      />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="firstname">First Name</Label>
        <Input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="First Name"
          value={playerData.firstname}
          onChange={handleInputChange}
        />
        {errors.firstname && <FieldError>{errors.firstname}</FieldError>}
        <Label htmlFor="lastname">Last Name</Label>
        <Input
          type="text"
          id="lastname"
          name="lastname"
          placeholder="Last Name"
          value={playerData.lastname}
          onChange={handleInputChange}
        />
        {errors.lastname && <FieldError>{errors.lastname}</FieldError>}
        <Label htmlFor="birthday">Birthday</Label>
        <Input
          type="date"
          id="birthday"
          name="birthday"
          placeholder="Birthday"
          value={playerData.birthday}
          onChange={handleInputChange}
        />
        {errors.birthday && <FieldError>{errors.birthday}</FieldError>}
        <Label htmlFor="image">Image URL</Label>
        <Input
          type="url"
          id="image"
          name="image"
          placeholder="Image URL"
          value={playerData.image}
          onChange={handleInputChange}
        />
        {errors.image && <FieldError>{errors.image}</FieldError>}

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Card'}
        </Button>
        {mainError && <ErrorMessage>{mainError}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </Form>
    </>
  );
};

export default CreateCard;

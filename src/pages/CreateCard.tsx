import React, { useState } from 'react';
import './CreateCard.css';
import { Card } from '../types';
import { useHistory } from 'react-router-dom';

export const CreateCard = () => {
  const history = useHistory();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Client-side validation
    if (!firstname || !lastname || !birthday) {
      setError('All fields are required.');
      return;
    }

    const newCard: Omit<Card, 'id'> = {
      player: {
        firstname,
        lastname,
        birthday,
        image: '',
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
        const errorData = await response.json();
        setError(
          errorData.message || 'An error occurred while submitting the form.'
        );

        throw new Error('Network response was not ok');
      } 

      setSuccess('Card created successfully!');
      setError(null);
      // Clear form fields
      setFirstname('');
      setLastname('');
      setBirthday('');
    } catch (err) {
      setError('Failed to create card. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="create-card">
      <h2>Create a New Card</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <button type="submit">Create Card</button>
      </form>
      <button
        className="form-secondary-btn"
        onClick={() => history.push('/collection')}
      >
        Go to collections
      </button>
    </div>
  );
};

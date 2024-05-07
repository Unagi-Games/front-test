import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './CreateCard.css';

interface NewCard {
  firstname: string;
  lastname: string;
  position: string;
  dob: string;
  image: string;
}

export const CreateCard: React.FC = () => {
  const [formData, setFormData] = useState<NewCard>({
    firstname: '',
    lastname: '',
    position: '',
    dob: '',
    image: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();

    axios
      .post('http://localhost:8001/cards', { player: formData })
      .then(function (response) {
        if (response.status === 201) {
          setSuccessMessage('Card created successfully.');
          history.push('/collection');
        }
      })
      .catch(function (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data.message ||
              'An error occurred while creating the card.'
          );
        } else {
          setError('An error occurred while creating the card.');
        }
      });
  };

  return (
    <>
      <div className="create-card-container">
        <div className="form-wrapper">
          <h2>Create a New Card</h2>
          {error && <div className="error">{error}</div>}
          {successMessage && <div className="success">{successMessage}</div>}
          <form onSubmit={handleSubmit} className="create-card-form">
            <div className="form-group">
              <label htmlFor="firstname">First Name:</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last Name:</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL:</label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="create-card-button">
              Create Card
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

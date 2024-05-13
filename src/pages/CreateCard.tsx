import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';
import { IPlayer } from "../types/Card";
import { createCard } from "../lib/collection";
import './CreateCard.css';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  birthday: Yup.string().required('DOB is required'),
});

export const CreateCard = () => {
  const history = useHistory();
  const [formData, setFormData] = useState<IPlayer>({
    firstname: '',
    lastname: '',
    birthday: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await createCard(formData);
      history.push('/collection');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        setErrors({ server: 'An error occurred while creating the card' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title">Create Card</h1>

      <div className="item">
        <input
          type="text"
          placeholder="First Name"
          value={formData.firstname}
          onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
        />
        {errors.firstname && <span>{errors.firstname}</span>}
      </div>

      <div className="item">
        <input
          type="text"
          placeholder="Last Name"
          value={formData.lastname}
          onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        />
        {errors.lastname && <span>{errors.lastname}</span>}
      </div>

      <div className="item">
        <input
          type="date"
          placeholder="DOB"
          value={formData.birthday}
          onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
        />
        {errors.birthday && <span>{errors.birthday}</span>}
      </div>

      <button type="submit">Create Card</button>

      {errors.server && <span>{errors.server}</span>}
    </form>
  );
};

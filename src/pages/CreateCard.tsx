import React, { useState } from 'react';

import './CreateCard.css';
import styled from 'styled-components';
import Card from '../types/interfaces/Card';

/**
 * Step 3: Render a form and everything needed to be able to create a card
 */
export const CreateCard = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setError(null);
        setSuccess(null);

        // Client-side validation
        if (!firstname || !lastname || !birthday) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        const newCard: Omit<Card, 'id'> = {
            player: {
                firstname,
                lastname,
                birthday,
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
                throw new Error(`Error: ${response.status}`);
            }

            setSuccess('Card created successfully!');
        } catch (err) {
            setError(`Failed to create card: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormWrapper>
            <h1>Create a New Card</h1>
            <Form onSubmit={handleSubmit}>
                <Label>
                    Firstname:
                    <Input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </Label>
                <Label>
                    Lastname:
                    <Input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </Label>
                <Label>
                    Birthday:
                    <Input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </Label>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Card'}
                </Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
            </Form>
        </FormWrapper>
    );
};



const FormWrapper = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 16px;
  background-color:#1d1e22;
  border: 1px solid #4d4d4d;
  border-radius: 8px;
  box-shadow: 0 5px 30px rgba(1, 1, 1, 0.3);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap:1rem;
`;

const Input = styled.input`
flex:1;
  padding: 6px 12px;
background: rgb(31, 32, 35);
border: 1px solid rgb(60, 63, 68);
border-radius: 4px;
font-size: 13px;
color: rgb(247, 248, 248);
height: 35px;
appearance: none;
transition: border 0.15s ease 0s;
:focus{
    outline: none;
    box-shadow: none;
    border-color: rgb(100, 153, 255);
}
`;

const Button = styled.button`
margin-top:.5rem;
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 16px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 16px;
`;





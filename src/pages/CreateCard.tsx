import React, { useState } from 'react';

import './CreateCard.css';
import styled from 'styled-components';

/**
 * Step 3: Render a form and everything needed to be able to create a card
 */
export const CreateCard = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                <Button type="submit">
                </Button>

            </Form>
        </FormWrapper>
    );

};



const FormWrapper = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 4px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
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

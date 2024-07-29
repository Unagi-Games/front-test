import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const TitleMessageSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  position: sticky;
  background-color: #30333a;
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  width: 100%;
`;

const TitleMessage = styled.div`
  color: white;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 20px;
  font-weight: bold;
  text-align: center;
  font-size: 32px;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  margin-right: 20px;
  height: 40px;
  min-width: 200px;
  &:hover {
    background-color: #0056b3;
  }
`;

type NavTypes = {
  title: string;
  routeName: string;
  buttonName: string;
};

export const Navbar: React.FC<NavTypes> = ({
  title,
  routeName,
  buttonName,
}) => {
  const history = useHistory();
  const handleButtonClick = () => {
    history.push(routeName);
  };
  return (
    <TitleMessageSection>
      <TitleMessage>{title}</TitleMessage>
      <Button onClick={handleButtonClick}>{buttonName}</Button>
    </TitleMessageSection>
  );
};

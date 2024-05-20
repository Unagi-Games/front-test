import React from 'react';
import styled from "styled-components";

const ErrorWrapper = styled.div`
  border: 1px solid red;
  background-color: #fdd;
  color: red;
  padding: 10px 20px;
  margin: 20px 0;
  border-radius: 5px;
  font-size: 14px;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.2);
`;

export const ErrorView = ({ message }) => {
  return (
    <ErrorWrapper>
      {message}
    </ErrorWrapper>
  );
};
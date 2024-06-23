import React from 'react';
import styled from 'styled-components';
import { TCard } from '../../types';

const StyledCard = styled.button`
	border: 1px;
	border-radius: 6px;
	border-color: aqua;
	background-color: #eae8e8;
	height: 280px;
	width: 240px;
`;

const Card: React.FC<TCard> = ({ id, player }) => (
  <StyledCard>
    <p>hello baby</p>
  </StyledCard>
);

export default Card;

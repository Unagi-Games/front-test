import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';

type TProps = {
	children: ReactNode;
};
const StyledContainer = styled.div`
	background-color: azure;
	width: 100dvw;
	height: 100dvh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Container: FC<TProps> = ({ children }) => (
  <StyledContainer>{children}</StyledContainer>
);

export default Container;

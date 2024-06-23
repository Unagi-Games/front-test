import React from 'react';
import styled from 'styled-components';
import { TCard } from '../../types';
import Image from '../Image/Image';
import { convertIsoTimeToNormalDate } from '../../utils';

const StyledCard = styled.div`
	border: 1px;
	border-radius: 6px;
	border-color: aqua;
	background-color: #eae8e8;
	height: 280px;
	width: 240px;
	display: flex;
	flex-direction: column;
`;

const ImageHolder = styled.div`
	flex-grow: 3;
	width: 100%;
`;

const PlayerDetail = styled.div`
	flex-grow: 1;
	background-color: wheat;
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 0 4px;
`;

const Card: React.FC<TCard> = ({ id, player }) => {
	return (
		<StyledCard>
			<ImageHolder>
				<Image src={id.toString()} alt="player-photo" />
			</ImageHolder>
			<PlayerDetail>
				<p>DOB:</p>
				<p>{convertIsoTimeToNormalDate(player.birthday)}</p>
			</PlayerDetail>
		</StyledCard>
	);
};

export default Card;

import React from 'react';

import { fetchCollection } from '../lib/collection';

import { Card, Container } from '../components';

export function Collection() {
	const collection = fetchCollection();
	const card = collection[0];

	/**
	 * Step 1: Render the card
	 */
	return (
		<Container>
			<Card id={card.id} player={card.player} />
		</Container>
	);
}

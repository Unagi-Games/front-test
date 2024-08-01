import { Card } from '../types';

export const fetchCollection = async (): Promise<Card[]> => {
  try {
    const response = await fetch('http://localhost:8001/cards');
    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('Internal Server Error (500)');
      } else {
        throw new Error(`Error fetching collection: ${response.statusText}`);
      }
    }
    const data: Card[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

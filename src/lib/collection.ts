import { IPlayer } from "../types/Card";

export const fetchCollection = async () => {
  try {
    const response = await fetch('http://localhost:8001/cards');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const createCard = async (formData: IPlayer) => {
  try {
    const response = await fetch('http://localhost:8001/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player: formData }),
    });

    if (!response.ok) {
      throw new Error('Failed to create card');
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

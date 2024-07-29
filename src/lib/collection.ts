import axios from 'axios';
import { CardData } from '../types';

export const fetchCollection = async (): Promise<CardData[]> => {
  try {
    const response = await axios.get<CardData[]>('http://localhost:8001/cards');
    return response.data;
  } catch (error) {
    throw error;
  }
};

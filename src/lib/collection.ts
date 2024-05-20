import { Base_URL } from './constants';
import axios from 'axios';

export const fetchCollection = () => {
  return axios.get(`${Base_URL}` + 'cards');
};

export const postCollection = (body) => {
  return axios.post(`${Base_URL}` + 'cards', { player: body })
}

// collection.ts

import axios from 'axios';

export interface Player {
  id: number;
  player: {
    firstname: string;
    lastname: string;
    birthday: string;
    image: string;
  };
}

export var fetchCollection = function () {
  return axios
    .get('http://localhost:8001/cards')
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error('Error fetching collection:', error);
      throw error; // Re-throwing error for the caller to handle
    });
};

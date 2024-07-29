// This file will be used for exporting types throughout the project

export type Player = {
  birthday: string;
  firstname: string;
  image: string;
  lastname: string;
};

export type CardData = {
  id: number;
  player: Player;
};

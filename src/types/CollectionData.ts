export interface IPlayer {
  firstname: string;
  lastname: string;
  birthday: string;
  image: string;
}

export interface ICard {
  id: number;
  player: IPlayer;
}

export interface ICollectionData {
  cards: ICard[];
}

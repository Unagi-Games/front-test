export interface Player {
    id: number;
    firstname: string;
    lastname: string;
    birthday: string;
    image: string;
  }
  
  export interface Card {
    id: number;
    player: Player;
  }
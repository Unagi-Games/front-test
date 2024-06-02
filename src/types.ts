export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  birthday: string;
  image: string;
}

export interface Data {
  id: number;
  player: Player;
}

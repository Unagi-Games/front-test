export interface Player {
  firstname: string;
  lastname: string;
  birthday: string;
  image: string;
}

export interface Data {
  id: number | string;
  player: Player;
}

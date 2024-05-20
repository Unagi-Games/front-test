
export interface PlayerProperties {
    firstname: string;
    lastname: string;
    birthday: string;
    image: string;
}

export interface Player {
    id: string;
    player: PlayerProperties;
}

export interface PlayerListProps {
    players: Player[];
    loading: boolean;
}

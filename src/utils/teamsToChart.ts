type Player = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string | null;
  email: string;
};

type Game = {
  id: number;
  game_name: string;
  game_image: string;
  game_type: string;
  elimination_modes: {
    id: number;
    elimination_mode: string;
  }[];
};

type Organization = {
  id: number;
  user: Player;
  organization_name: string;
  players: number[];
};

export type Team = {
  id: number;
  team_name: string;
  organization: Organization;
  team_image: string;
  game: Game;
  team_type: string;
  players: Player[];
  manager: Player;
};

export type ChartDataNode = {
  id: string;
  name: string;
  image: string | null;
  parentId: string | null;
  childrenIds: string[];
};

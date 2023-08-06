type Player = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: null | string;
  email: string;
};

type EliminationMode = {
  id: string;
  elimination_mode: string;
};

type Game = {
  id: string;
  game_name: string;
  game_image: string;
  game_type: string;
  elimination_modes: EliminationMode[];
};

export type OrganizationTeam = {
  id: string;
  team_name: string;
  team_image: string;
  game: Game;
  team_type: string;
  players: Player[];
  manager: Player;
};

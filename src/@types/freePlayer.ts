type Player = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: null | string;
  email: string;
};

type Organization = {
  id: number;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    avatar: null | string;
    email: string;
  };
  organization_name: string;
  players: number[];
};

export type Request = {
  id: number;
  player: Player;
  organization: Organization;
  request_date: string;
  request_started_by: string;
  request_status: string;
  remarks: string;
};

import { CustomFile } from 'src/components/upload';

export interface Tournament {
  id: number;
  game: {
    id: number;
    game_name: string;
    game_image: string;
    game_type: string;
    elimination_modes: {
      id: number;
      elimination_mode: string;
    }[];
  };
  tournament_name: string;
  tournament_logo: string;
  tournament_mode: string;
  tournament_participants: string;
  is_free: boolean;
  tournament_banner: CustomFile | string | null;
  tournament_fee: number;
  maximum_no_of_participants: number;
  tournament_description: string;
  tournament_rules: string;
  tournament_prize_pool: string;
  registration_opening_date: string;
  registration_closing_date: string;
  tournament_start_date: string;
  tournament_end_date: string;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  is_registration_enabled: boolean;
  accept_registration_automatic: boolean;
  contact_email: string;
  discord_link: string;
  organizer: number;
  event: number;
}

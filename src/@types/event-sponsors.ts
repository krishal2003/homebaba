import { CustomFile } from 'src/components/upload';

export interface ISponsors {
  id: number;
  sponsor_name: string;
  sponsorship_category: string;
  sponsor_banner: CustomFile | string | null;
  order: number;
}

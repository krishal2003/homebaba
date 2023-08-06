import { CustomFile } from '../components/upload';

// ----------------------------------------------------------------------

export type IBlogPostComment = {
  id: number;
  body: string;
  created_at: Date;
  user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  replies: IBlogPostComment[];
};

export type IBlogNewPost = {
  thumbnail_image: CustomFile | string | null;
  thumbnail_image_alt_description: string;
  title: string;
  article_content: string;
  tags: string[];
  categories: string[];
  is_featured: boolean;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
};

export type IBlogPost = {
  id: number;
  categories: string[];
  tags: string[];
  slug: string;
  thumbnail_image: string;
  thumbnail_image_alt_description: string;
  title: string;
  article_content: string;
  created_at: Date | string | number;
  updated_at: Date | string | number;
  is_featured: boolean;
  is_published: boolean;
  meta_title: string;
  meta_description: string;
  author: {
    id: number;
    user_name: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
};

// interface Article {
//   id: number;
//   slug: string;
//   thumbnail_image: string;
//   thumbnail_image_alt_description: string;
//   title: string;
//   article_content: string;
//   time_to_read: number;
//   created_at: string;
//   updated_at: string;
//   is_featured: boolean;
//   is_popular: boolean;
//   is_verified: boolean;
//   is_published: boolean;
//   meta_title: string;
//   meta_description: string;
//   author: number;
//   c_name: number[];
//   tags: number[];
// }

export type ITestimonial = {
  id: number;
  user: {
    id:number;
    username:string;
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  description: string;
  rating: number;
  is_verified: boolean;
  created_at:string;
  updated_at:string;
};

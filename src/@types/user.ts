// ----------------------------------------------------------------------

export type IUserSocialLink = {
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type IUserProfileFollowers = {
  follower: number;
  following: number;
};

export type IUserProfileCover = {
  name: string;
  cover: string;
  role: string;
};

export type IUserProfileAbout = {
  quote: string;
  country: string;
  email: string;
  role: string;
  company: string;
  school: string;
};

export type IUserProfile = IUserProfileFollowers &
  IUserProfileAbout & {
    id: string;
    socialLinks: IUserSocialLink;
  };

export type IUserProfileFollower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type IUserProfileGallery = {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

export type IUserProfileFriend = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

export type IUserProfilePost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date | string | number;
  media: string;
  message: string;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date | string | number;
    message: string;
  }[];
};

// ----------------------------------------------------------------------

export type IUserCard = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPosts: number;
  role: string;
  amount: string;
  productName: string;
  shoeimage: string;
  shoeimagehover: string;
};

export type ITournamentCard = {
  id: number;
  slug: string;
  game: {
    id: number;
    game_name: string;
    game_image: string;
    game_type: string;
    elimination_modes: [
      {
        id: number;
        elimination_mode: string;
      }
    ];
  };
  tournament_name: string;
  tournament_logo: string;
  tournament_banner: string;
  tournament_mode: string;
  tournament_participants: string;
  is_free: boolean;
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
};
export type IHomebabaCard = {
  UnparsedAddress: string;
  BuildingName: string;
  CarportSpaces: string;
  OccupantPhone: string;
  YearBuilt: string;
  DirectionFaces: string;
  OccupantName: string;
  BuildingFeatures: string[];
  LaundryFeatures: string[];
  Flooring: string[];
  ExteriorFeatures: string[];
  DoorFeatures: string[];
  AccessibilityFeatures: string[];
  StateOrProvince: string;
  ListPrice: any;
  ListingId: number;
  ListingKey: number;
  AssociationName2: string;
  BathroomsTotalInteger: number;
  RoomsTotal: string;
  Stories: string;
  TaxYear: string;
  City: string;
  BuildingAreaTotal: string;
  ConstructionMaterials: string;
  PublicRemarks: string;
  BedroomsTotal: number;
  id: number;
  slug: string;
  tournament_logo: string;
  Media: {
    Order: number;
    MediaCategory: string;
    MediaUrl: string;
  };
  tournament_banner: string;
};

// ----------------------------------------------------------------------

export type IUserAccountGeneral = {
  id: string;
  avatarUrl: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

export type IFreePlayer = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
};

export type IUserAccountList = {
  id: string;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  nationality: string;
  is_verified: boolean;
  status: string;
  bio: string;
  role: string;
  facebook_link: string;
  twitter_link: string;
  youtube_link: string;
  website_link: string;
  discord_link: string;
  linkedin_link: string;
  twitch_link: string;
  instagram_link: string;
  reddit_link: string;
};
export type IUserAccountBillingCreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type IUserAccountBillingInvoice = {
  id: string;
  createdAt: Date | string | number;
  price: number;
};

export type IUserAccountBillingAddress = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type IUserAccountChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

// ----------------------------------------------------------------------

export type IUserAccountNotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

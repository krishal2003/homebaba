import { sub } from 'date-fns';
//
import {
  age,
  role,
  price,
  title,
  email,
  rating,
  percent,
  country,
  company,
  boolean,
  sentence,
  lastName,
  fullName,
  firstName,
  description,
  Testimonialdescription,
  Testimonialemail,
  Privacydescription,
  fullAddress,
  phoneNumber,
  team1,
  team2,
  date,
  team2score,
  team1score,
  heading,
  amount,
  link,
} from './assets';
import { productName } from './assets/productName';

// ----------------------------------------------------------------------

const _mock = {
  id: (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index: number) => email[index],
  Testimonialemail: (index: number) => Testimonialemail[index],
  phoneNumber: (index: number) => phoneNumber[index],
  heading: (index: number) => heading[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  team1score: (index: number) => team1score[index],
  team2score: (index: number) => team2score[index],
  date: (index: number) => date[index],
  boolean: (index: number) => boolean[index],
  description: (index: number) => description[index],
  rating: (index: number) => rating[index],
  Testimonialdescription: (index: number) => Testimonialdescription[index],
  role: (index: number) => role[index],
  link: (index: number) => link[index],
  amount: (index: number) => amount[index],
  productName: (index: number) => productName[index],
  company: (index: number) => company[index],
  shoeimage: (index: number) => `/assets/shoes/shoes_${index + 1}.jpg`,
  shoeimagehover: (index: number) => `/assets/hover/hover_${index + 1}.jpg`,

  address: {
    fullAddress: (index: number) => fullAddress[index],
    country: (index: number) => country[index],
  },
  name: {
    firstName: (index: number) => firstName[index],
    lastName: (index: number) => lastName[index],
    fullName: (index: number) => fullName[index],
  },
  text: {
    title: (index: number) => title[index],
    sentence: (index: number) => sentence[index],
    description: (index: number) => description[index],
    team1: (index: number) => team1[index],
    team2: (index: number) => team2[index],
    Privacydescription: (index: number) => Privacydescription[index],
  },
  number: {
    percent: (index: number) => percent[index],
    rating: (index: number) => rating[index],
    age: (index: number) => age[index],
    price: (index: number) => price[index],
  },
  image: {
    cover: (index: number) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_${index + 1}.jpg`,
    product: (index: number) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/products/product_${index + 1}.jpg`,
    avatar: (index: number) =>
      `https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_${index + 1}.jpg`,
    sponsor: (index: number) => `/assets/collection/emerge_${index + 1}.jpg`,
  },
};

export default _mock;

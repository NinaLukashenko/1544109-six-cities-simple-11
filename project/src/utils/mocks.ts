import { address, datatype, image, internet, lorem, name } from 'faker';
import { cities, DEFAULT_CITY_INDEX } from '../consts/city';
import { OfferType } from '../consts/offer';
import { City, Offer, Offers } from '../types/offers';
import { Review, Reviews } from '../types/reviews';
import { AuthUser } from '../types/user';
import { getRandomNumber } from './utils';

export const makeFakeUserData = (): AuthUser => ({
  id: datatype.number(10),
  avatarUrl: image.avatar(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  email: internet.email(),
  token: datatype.string(32),
});

export const makeFakeCity = (cityIndex?: number): City => {
  let index: number;
  if (cityIndex || cityIndex === 0) {
    index = cityIndex;
  } else {
    index = getRandomNumber(0, cities.length - 1);
  }

  return {
    location: {
      latitude: cities[index].location.latitude,
      longitude: cities[index].location.longitude,
      zoom: 10,
    },
    name: cities[index].name,
  };
};

export const makeFakeOffer = (id: number, cityIndex?: number): Offer => ({
  bedrooms: datatype.number(5),
  city: makeFakeCity(cityIndex),
  description: lorem.word(5) + lorem.word(10) + lorem.word(25) + lorem.word(20) + lorem.word(10) + lorem.word(15),
  goods: [lorem.word(), lorem.word(), lorem.word(), lorem.word(), lorem.word()],
  host: {
    avatarUrl: image.avatar(),
    id: datatype.number(10),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: id,
  images: ['/img_2.jpeg', '/img_3.jpeg', '/img_4.jpeg'],
  isPremium: datatype.boolean(),
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: 10,
  },
  maxAdults: datatype.number(10),
  previewImage: '/img_1.jpeg',
  price: datatype.number(300),
  rating: datatype.number(5),
  title: lorem.word(15) + lorem.word(10) + lorem.word(5),
  type: OfferType.Hotel,
});

export const makeFakeOffers = (): Offers => [makeFakeOffer(1, DEFAULT_CITY_INDEX), makeFakeOffer(2), makeFakeOffer(3)];

export const makeFakeComment = (id: number): Review => ({
  comment: makeFakeCommentText(),
  date: '2022-09-26T13:58:46.499Z',
  id: id,
  rating: datatype.number(5),
  user: {
    avatarUrl: image.avatar(),
    id: datatype.number(10),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
});

export const makeFakeComments = (): Reviews => [makeFakeComment(1), makeFakeComment(2), makeFakeComment(3)];

export const makeFakeCommentText = () => lorem.word(5) + lorem.word(10) + lorem.word(25) + lorem.word(5) + lorem.word(5);

import { StarRates } from '../types/reviews';

export const FIRST_OFFER_IMAGE_INDEX = 0;
export const OFFER_IMAGES_MAX_QUANTITY = 6;

export const FIRST_OFFER_COMMENT_INDEX = 0;
export const OFFER_COMMENTS_MAX_QUANTITY = 10;

export enum OfferType {
  Apartment = 'apartment',
  PrivateRoom = 'room',
  House = 'house',
  Hotel = 'hotel',
}

export enum StarRateValue {
  None,
  OneStar,
  TwoStars,
  ThreeStars,
  FourStars,
  FiveStars,
}

export const starRates: StarRates = [
  {
    value: StarRateValue.OneStar,
    title: 'terribly',
  },
  {
    value: StarRateValue.TwoStars,
    title: 'badly',
  },
  {
    value: StarRateValue.ThreeStars,
    title: 'not bad',
  },
  {
    value: StarRateValue.FourStars,
    title: 'good',
  },
  {
    value: StarRateValue.FiveStars,
    title: 'perfect',
  },
];

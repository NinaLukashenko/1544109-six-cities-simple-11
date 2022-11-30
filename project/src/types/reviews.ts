import { StarRateValue } from '../consts/offer';
import { Consumer } from './offers';

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: Consumer;
}

export type Reviews = Review[];

export type ReviewData = {
  hotelId: number;
  review: string;
  rating: StarRateValue;
}

type StarRateText = 'perfect' | 'good' | 'not bad' | 'badly' | 'terribly' | 'none';

export type StarRate = {
  value: StarRateValue;
  title: StarRateText;
};

export type StarRates = StarRate[];

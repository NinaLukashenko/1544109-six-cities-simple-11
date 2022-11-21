import { StarRating } from '../consts/offer';
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
  rating: StarRating;
}

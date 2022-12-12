import { AuthorizationStatus } from '../consts/app';
import { SortOption } from '../consts/sort';
import { store } from '../store/index';
import { City, Offer, Offers } from './offers';
import { Reviews } from './reviews';
import { AuthUser } from './user';
import { Nullable } from './utils';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: Nullable<AuthUser>;
};

export type OffersData = {
  city: City;
  isLoading: boolean;
  offers: Offers;
  sort: SortOption;
  hoveredOffer: Nullable<Offer>;
}

export type CurrentOfferData = {
  isLoading: boolean;
  offer: Nullable<Offer>;
  comments: Reviews;
  isCommentSending: boolean;
  isResetingCommentForm: boolean;
  offersNearby: Offers;
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { createAction } from '@reduxjs/toolkit';
import { AppRoute, AuthorizationStatus } from '../consts/app';
import { SortOption } from '../consts/sort';
import { City, Offer, Offers } from '../types/offers';
import { Reviews } from '../types/reviews';
import { User } from '../types/user';
import { Nullable } from '../types/utils';

export const changeCity = createAction(
  'offers/changeCity',
  (city: City) => ({
    payload: city,
  })
);

export const setOffersLoadingStatus = createAction(
  'offers/setOffersLoadingStatus',
  (isLoading: boolean) => ({
    payload: isLoading,
  })
);

export const setOffers = createAction(
  'offers/setOffers',
  (offers: Offers) => ({
    payload: offers,
  })
);

export const changeSortOption = createAction(
  'offers/changeSortOption',
  (sortOption: SortOption) => ({
    payload: sortOption,
  })
);

export const setCurrentOfferLoadingStatus = createAction(
  'offer/setCurrentOfferLoadingStatus',
  (isLoading: boolean) => ({
    payload: isLoading,
  })
);

export const setOfferById = createAction(
  'offer/setOfferById',
  (offer: Offer) => ({
    payload: offer,
  })
);

export const setComments = createAction(
  'offer/setComments',
  (comments: Reviews) => ({
    payload: comments,
  })
);

export const setCommentSendingStatus = createAction(
  'offer/setCommentSendingStatus',
  (isSending: boolean) => ({
    payload: isSending,
  })
);

export const setFormResetingStatus = createAction(
  'offer/setFormResetingStatus',
  (reset: boolean) => ({
    payload: reset,
  })
);

export const setOffersNearby = createAction(
  'offer/setOffersNearby',
  (offers: Offers) => ({
    payload: offers,
  })
);

export const changeAuthStatus = createAction(
  'auth/changeAuthStatus',
  (authStatus: AuthorizationStatus) => ({
    payload: authStatus,
  })
);

export const setUserData = createAction(
  'auth/setUserData',
  (user: Nullable<User>) => ({
    payload: user,
  })
);

export const redirectToRoute = createAction(
  'auth/redirectToRoute',
  (route: AppRoute) => ({
    payload: route,
  })
);



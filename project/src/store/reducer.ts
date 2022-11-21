import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../consts/app';
import { DEFAULT_CITY } from '../consts/city';
import { SortOption, DEFAULT_SORT_OPTION } from '../consts/sort';
import { changeCity, changeSortOption, setComments, setCommentSendingStatus, setCurrentOfferLoadingStatus, setFormResetingStatus, setOfferById, setOffers, setOffersLoadingStatus, setOffersNearby } from './actions';
import { City, Offer, Offers } from '../types/offers';
import { User } from '../types/user';
import { Nullable } from '../types/utils';
import { changeAuthStatus, setUserData } from './actions';
import { Reviews } from '../types/reviews';

type InitialState = {
  city: City;
  isOffersLoading: boolean;
  offers: Offers;
  sort: SortOption;
  isCurrentOfferLoading: boolean;
  currentOffer: Nullable<Offer>;
  comments: Reviews;
  isCommentSending: boolean;
  isResetingCommentForm: boolean;
  offersNearby: Offers;
  authorizationStatus: AuthorizationStatus;
  user: Nullable<User>;
};

const initialState: InitialState = {
  city: DEFAULT_CITY,
  isOffersLoading: false,
  offers: [],
  sort: DEFAULT_SORT_OPTION,
  isCurrentOfferLoading: false,
  currentOffer: null,
  comments: [],
  isCommentSending: false,
  isResetingCommentForm: false,
  offersNearby: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffersLoadingStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortOption, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(setCurrentOfferLoadingStatus, (state, action) => {
      state.isCurrentOfferLoading = action.payload;
    })
    .addCase(setOfferById, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCommentSendingStatus,(state, action) => {
      state.isCommentSending = action.payload;
    })
    .addCase(setFormResetingStatus, (state, action) => {
      state.isResetingCommentForm = action.payload;
    })
    .addCase(setOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(changeAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    });
});

export default reducer;

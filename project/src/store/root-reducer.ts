import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts/api';
import { currentOfferData } from './current-offer-data/current-offer-data';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersData.reducer,
  [NameSpace.CurrentOffer]: currentOfferData.reducer,
});

import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../consts/city';
import { DEFAULT_SORT_OPTION } from '../consts/sort';
import { offers } from '../mocks/offers';
import { changeCity, changeSortOption, setOffers } from './action';

const initialState = {
  city: DEFAULT_CITY,
  offers: offers,
  sort: DEFAULT_SORT_OPTION,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortOption, (state, action) => {
      state.sort = action.payload;
    });
});

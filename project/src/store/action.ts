import { createAction } from '@reduxjs/toolkit';
import { SortOption } from '../consts/sort';
import { City, Offer } from '../types/offers';

export const changeCity = createAction(
  'offers/changeCity',
  (city: City) => ({
    payload: city,
  })
);

export const setOffers = createAction(
  'offers/setOffers',
  (offers: Offer[]) => ({
    payload: offers,
  })
);

export const changeSortOption = createAction(
  'offers/changeSortOption',
  (sortOption: SortOption) => ({
    payload: sortOption,
  })
);

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/api';
import { DEFAULT_CITY } from '../../consts/city';
import { DEFAULT_SORT_OPTION, SortOption } from '../../consts/sort';
import { City, Offer, Offers } from '../../types/offers';
import { OffersData } from '../../types/state';
import { Nullable } from '../../types/utils';
import { fetchOffersAction } from '../api-actions';

const initialState: OffersData = {
  city: DEFAULT_CITY,
  isLoading: false,
  offers: [],
  sort: DEFAULT_SORT_OPTION,
  hoveredOffer: null,
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    changeSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sort = action.payload;
    },
    changeHoveredOffer: (state, action: PayloadAction<Nullable<Offer>>) => {
      state.hoveredOffer = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.isLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { changeCity, changeSortOption, changeHoveredOffer } = offersData.actions;

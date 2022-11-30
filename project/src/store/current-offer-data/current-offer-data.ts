import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts/api';
import { Offer, Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { CurrentOfferData } from '../../types/state';
import { fetchCommentsAction, fetchOfferByIdAction, fetchOffersNearbyAction, saveCommentAction } from '../api-actions';

const initialState: CurrentOfferData = {
  isLoading: false,
  offer: null,
  comments: [],
  isCommentSending: false,
  isResetingCommentForm: false,
  offersNearby: [],
};

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    setFormResetingStatus: (state, action: PayloadAction<boolean>) => {
      state.isResetingCommentForm = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferByIdAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOfferByIdAction.fulfilled, (state, action: PayloadAction<Offer>) => {
        state.isLoading = false;
        state.offer = action.payload;
      })
      .addCase(fetchOfferByIdAction.rejected, (state) => {
        state.isLoading = false;
        state.offer = null;
        state.comments = [];
        state.offersNearby = [];
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action: PayloadAction<Reviews>) => {
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.comments = [];
      })
      .addCase(saveCommentAction.pending, (state) => {
        state.isCommentSending = true;
      })
      .addCase(saveCommentAction.fulfilled, (state, action: PayloadAction<Reviews>) => {
        state.isCommentSending = false;
        state.isResetingCommentForm = true;
        state.comments = action.payload;
      })
      .addCase(saveCommentAction.rejected, (state) => {
        state.isCommentSending = false;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action: PayloadAction<Offers>) => {
        state.offersNearby = action.payload;
      })
      .addCase(fetchOffersNearbyAction.rejected, (state) => {
        state.offersNearby = [];
      });
  }
});

export const { setFormResetingStatus } = currentOfferData.actions;

import { CurrentOfferData } from '../../types/state';
import { makeFakeComments, makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import { fetchCommentsAction, fetchOfferByIdAction, fetchOffersNearbyAction, saveCommentAction } from '../api-actions';
import { currentOfferData, setFormResetingStatus } from './current-offer-data';

const offer = makeFakeOffer(1);
const comments = makeFakeComments();
const offersNearby = makeFakeOffers();

describe('Reducer: current-offer-data', () => {
  let state: CurrentOfferData;

  beforeEach(() => {
    state = {
      isLoading: false,
      offer: null,
      comments: [],
      isCommentSending: false,
      isResetingCommentForm: false,
      offersNearby: [],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(currentOfferData.reducer(undefined, { type: 'UNKNOWN_ACTION'}))
      .toEqual({
        isLoading: false,
        offer: null,
        comments: [],
        isCommentSending: false,
        isResetingCommentForm: false,
        offersNearby: [],
      });
  });

  it('should update isResetingCommentForm to "TRUE"', () => {
    expect(currentOfferData.reducer(state, setFormResetingStatus(true)))
      .toEqual({
        isLoading: false,
        offer: null,
        comments: [],
        isCommentSending: false,
        isResetingCommentForm: true,
        offersNearby: [],
      });
  });

  it('should update isResetingCommentForm to "FALSE"', () => {
    state.isResetingCommentForm = true;
    expect(currentOfferData.reducer(state, setFormResetingStatus(false)))
      .toEqual({
        isLoading: false,
        offer: null,
        comments: [],
        isCommentSending: false,
        isResetingCommentForm: false,
        offersNearby: [],
      });
  });

  describe('fetchOfferByIdAction test', () => {
    it('should update isLoading flag to "TRUE" if fetchOfferByIdAction is pending', () => {
      expect(currentOfferData.reducer(state, { type: fetchOfferByIdAction.pending.type }))
        .toEqual({
          isLoading: true,
          offer: null,
          comments: [],
          isCommentSending: false,
          isResetingCommentForm: false,
          offersNearby: [],
        });
    });
    it('should update offer and isLoading flag to "FALSE" if fetchOfferByIdAction is fulfilled', () => {
      state.isLoading = true;

      expect(currentOfferData.reducer(state, { type: fetchOfferByIdAction.fulfilled.type, payload: offer }))
        .toEqual({
          isLoading: false,
          offer,
          comments: [],
          isCommentSending: false,
          isResetingCommentForm: false,
          offersNearby: [],
        });
    });
    it('should update isLoading, offer, comments and offersNearby if fetchOfferByIdAction is rejected', () => {
      state.isLoading = true;

      expect(currentOfferData.reducer(state, { type: fetchOfferByIdAction.rejected.type }))
        .toEqual({
          isLoading: false,
          offer: null,
          comments: [],
          isCommentSending: false,
          isResetingCommentForm: false,
          offersNearby: [],
        });
    });
  });

  describe('fetchCommentsAction test', () => {
    it('should update comments if fetchCommentsAction is fullfilled', () => {
      expect(currentOfferData.reducer(state, { type: fetchCommentsAction.fulfilled.type, payload: comments }))
        .toEqual({
          isLoading: false,
          offer: null,
          comments,
          isCommentSending: false,
          isResetingCommentForm: false,
          offersNearby: [],
        });
    });

    it('should set comments to "[]" if fetchCommentsAction is rejected', () => {
      expect(currentOfferData.reducer(state, { type: fetchCommentsAction.rejected.type}))
        .toEqual({
          isLoading: false,
          offer: null,
          comments: [],
          isCommentSending: false,
          isResetingCommentForm: false,
          offersNearby: [],
        });
    });
  });

  describe('saveCommentAction test', () => {
    it('should update isCommentSending to "TRUE" if saveCommentAction is pending', () => {
      expect(currentOfferData.reducer(state, { type: saveCommentAction.pending.type}))
        .toEqual({
          isLoading: false,
          offer: null,
          comments: [],
          isCommentSending: true,
          isResetingCommentForm: false,
          offersNearby: [],
        });
    });

    it('should update isCommentSending, isResetingCommentForm and comments if saveCommentAction is fullfilled', () => {
      state.isCommentSending = true;
      expect(currentOfferData.reducer(state, { type: saveCommentAction.fulfilled.type, payload: comments}))
        .toEqual({
          isLoading: false,
          offer: null,
          comments,
          isCommentSending: false,
          isResetingCommentForm: true,
          offersNearby: [],
        });
    });

    it('should update isCommentSending to "FALSE" if saveCommentAction is rejected', () => {
      state.isCommentSending = true;
      expect(currentOfferData.reducer(state, { type: saveCommentAction.rejected.type}))
        .toEqual({
          isLoading: false,
          offer: null,
          comments: [],
          isCommentSending: false,
          isResetingCommentForm: false,
          offersNearby: [],
        });
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should update offersNearby if fetchOffersNearbyAction is fullfilled', () => {
      expect(currentOfferData.reducer(state, { type: fetchOffersNearbyAction.fulfilled.type, payload: offersNearby }))
        .toEqual({
          isLoading: false,
          offer: null,
          comments: [],
          isCommentSending: false,
          isResetingCommentForm: false,
          offersNearby,
        });
    });

    it('should set offersNearby to "[]" if fetchOffersNearbyAction is rejected', () => {
      expect(currentOfferData.reducer(state, { type: fetchOffersNearbyAction.rejected.type}))
        .toEqual({
          isLoading: false,
          offer: null,
          comments: [],
          isCommentSending: false,
          isResetingCommentForm: false,
          offersNearby: [],
        });
    });
  });

});

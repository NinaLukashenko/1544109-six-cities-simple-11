import { DEFAULT_CITY } from '../../consts/city';
import { DEFAULT_SORT_OPTION, SortOption } from '../../consts/sort';
import { OffersData } from '../../types/state';
import { makeFakeOffers, makeFakeCity, makeFakeOffer } from '../../utils/mocks';
import { fetchOffersAction } from '../api-actions';
import { changeCity, changeHoveredOffer, changeSortOption, offersData } from './offers-data';

const offers = makeFakeOffers();
const city = makeFakeCity();
const offer = makeFakeOffer(1);

describe('Reducer: offers-data', () => {
  let state: OffersData;

  beforeEach(() => {
    state = {
      city: DEFAULT_CITY,
      isLoading: false,
      offers: [],
      sort: DEFAULT_SORT_OPTION,
      hoveredOffer: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    //beforeEach
    expect(offersData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        city: DEFAULT_CITY,
        isLoading: false,
        offers: [],
        sort: DEFAULT_SORT_OPTION,
        hoveredOffer: null,
      });
  });

  it('should update city acording to given value', () => {
    // beforeEach
    expect(offersData.reducer(state, changeCity(city)))
      .toEqual({
        city,
        isLoading: false,
        offers: [],
        sort: DEFAULT_SORT_OPTION,
        hoveredOffer: null,
      });
  });

  it('should update sortOption acording to given value', () => {
    // beforeEach
    expect(offersData.reducer(state, changeSortOption(SortOption.Rating)))
      .toEqual({
        city: DEFAULT_CITY,
        isLoading: false,
        offers: [],
        sort: SortOption.Rating,
        hoveredOffer: null,
      });
  });

  it('should update hoveredOffer according to passed value', () => {
    // beforeEach
    expect(offersData.reducer(state, changeHoveredOffer(offer)))
      .toEqual({
        city: DEFAULT_CITY,
        isLoading: false,
        offers: [],
        sort: DEFAULT_SORT_OPTION,
        hoveredOffer: offer,
      });
  });

  describe('fetchOffersAction test', () => {
    it('should update isLoading flag to "TRUE" if fetchOffersAction is pending', () => {
      // beforeEach
      expect(offersData.reducer(state, { type: fetchOffersAction.pending.type }))
        .toEqual({
          city: DEFAULT_CITY,
          isLoading: true,
          offers: [],
          sort: DEFAULT_SORT_OPTION,
          hoveredOffer: null,
        });
    });

    it('should update offers and isLoading flag to "FALSE" if fetchOffersAction is fulfilled', () => {
      // beforeEach
      state.isLoading = true;

      expect(offersData.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: offers }))
        .toEqual({
          city: DEFAULT_CITY,
          isLoading: false,
          offers: offers,
          sort: DEFAULT_SORT_OPTION,
          hoveredOffer: null,
        });
    });

    it('should update isLoading flag to "FALSE" if fetchOffersAction is rejected', () => {
      // beforeEach
      state.isLoading = true;

      expect(offersData.reducer(state, { type: fetchOffersAction.rejected.type }))
        .toEqual({
          city: DEFAULT_CITY,
          isLoading: false,
          offers: [],
          sort: DEFAULT_SORT_OPTION,
          hoveredOffer: null,
        });
    });
  });
});

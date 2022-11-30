import { NameSpace } from '../../consts/api';
import { SortOption } from '../../consts/sort';
import { City, Offer, Offers } from '../../types/offers';
import { State } from '../../types/state';
import { Nullable } from '../../types/utils';

export const getCity = (state: State): City => state[NameSpace.Offers].city;

export const getIsLoading = (state: State): boolean => state[NameSpace.Offers].isLoading;

export const getOffers = (state: State): Offers => state[NameSpace.Offers].offers;

export const getSort = (state: State): SortOption => state[NameSpace.Offers].sort;

export const getHoveredOffer = (state: State): Nullable<Offer> => state[NameSpace.Offers].hoveredOffer;

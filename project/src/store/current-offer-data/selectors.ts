import { NameSpace } from '../../consts/api';
import { Offer, Offers } from '../../types/offers';
import { Reviews } from '../../types/reviews';
import { State } from '../../types/state';
import { Nullable } from '../../types/utils';

export const getIsLoading = (state: State): boolean => state[NameSpace.CurrentOffer].isLoading;

export const getOffer = (state: State): Nullable<Offer> => state[NameSpace.CurrentOffer].offer;

export const getComments = (state: State): Reviews => state[NameSpace.CurrentOffer].comments;

export const getIsCommentSending = (state: State): boolean => state[NameSpace.CurrentOffer].isCommentSending;

export const getIsResetingCommentForm = (state: State): boolean => state[NameSpace.CurrentOffer].isResetingCommentForm;

export const getOffersNearby = (state: State): Offers => state[NameSpace.CurrentOffer].offersNearby;

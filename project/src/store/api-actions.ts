import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts/api';
import { AuthorizationStatus, AppRoute } from '../consts/app';
import { saveToken, deleteToken } from '../services/token';
import { AuthData } from '../types/auth';
import { Offer, Offers } from '../types/offers';
import { ReviewData, Reviews } from '../types/reviews';
import { AppDispatch, State } from '../types/state';
import { User } from '../types/user';
import { changeAuthStatus, redirectToRoute, setComments, setCommentSendingStatus, setCurrentOfferLoadingStatus, setFormResetingStatus, setOfferById, setOffers, setOffersLoadingStatus, setOffersNearby, setUserData } from './actions';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOfferById',
  async (id, {dispatch, extra: api}) => {

    dispatch(setCurrentOfferLoadingStatus(true));
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(setOfferById(data));
      dispatch(setCurrentOfferLoadingStatus(false));
    } catch (error) {
      dispatch(setCurrentOfferLoadingStatus(false));
    }
  },
);

export const fetchCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchComments',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);
    dispatch(setComments(data));
  },
);

export const saveCommentAction = createAsyncThunk<void, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/saveComment',
  async ({ hotelId, review: comment, rating }, { dispatch, extra: api}) => {
    dispatch(setCommentSendingStatus(true));
    try {
      const { data } = await api.post<Reviews>(`${APIRoute.Comments}/${hotelId}`, { comment, rating });
      dispatch(setCommentSendingStatus(false));
      dispatch(setFormResetingStatus(true));
      dispatch(setComments(data));
    } catch {
      dispatch(setCommentSendingStatus(false));
    }
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffersNearby',
  async(id, { dispatch, extra: api}) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    dispatch(setOffersNearby(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api}) => {
    try {
      const { data: userData } = await api.get<User>(APIRoute.Login);
      dispatch(changeAuthStatus(AuthorizationStatus.Auth));
      dispatch(setUserData(userData));
    } catch {
      dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
      dispatch(setUserData(null));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api}) => {
    const { data: userData } = await api.post<User>(APIRoute.Login, { email, password });
    saveToken(userData.token);
    dispatch(changeAuthStatus(AuthorizationStatus.Auth));
    dispatch(setUserData(userData));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    deleteToken();
    dispatch(changeAuthStatus(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
  }
);

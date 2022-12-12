import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../consts/api';
import { AppRoute } from '../consts/app';
import { deleteToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth';
import { Offer, Offers } from '../types/offers';
import { ReviewData, Reviews } from '../types/reviews';
import { AppDispatch, State } from '../types/state';
import { AuthUser } from '../types/user';
import { redirectToRoute } from './actions';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const { data } = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferByIdAction = createAsyncThunk<Offer, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOfferById',
  async (id, {dispatch, extra: api}) => {
    const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Reviews, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchComments',
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<Reviews>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const saveCommentAction = createAsyncThunk<Reviews, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/saveComment',
  async ({ hotelId, review: comment, rating }, { dispatch, extra: api}) => {
    const { data } = await api.post<Reviews>(`${APIRoute.Comments}/${hotelId}`, { comment, rating });
    return data;
  }
);

export const fetchOffersNearbyAction = createAsyncThunk<Offers, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOffersNearby',
  async(id, { dispatch, extra: api}) => {
    const { data } = await api.get<Offers>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<AuthUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api}) => {
    const { data } = await api.get<AuthUser>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<AuthUser, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api}) => {
    const { data: userData } = await api.post<AuthUser>(APIRoute.Login, { email, password });
    saveToken(userData.token);
    dispatch(redirectToRoute(AppRoute.Main));

    return userData;
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
  }
);

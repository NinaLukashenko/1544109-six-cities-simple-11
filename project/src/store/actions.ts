import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../consts/app';

export const redirectToRoute = createAction(
  'auth/redirectToRoute',
  (route: AppRoute) => ({
    payload: route,
  })
);

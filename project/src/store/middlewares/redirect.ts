import reducer from '../reducer';
import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import browseHistory from '../../browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'auth/redirectToRoute') {
          browseHistory.push(action.payload);
        }

        return next(action);
      };

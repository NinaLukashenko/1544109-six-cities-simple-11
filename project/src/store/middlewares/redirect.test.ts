import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { AppRoute } from '../../consts/app';
import { State } from '../../types/state';
import { redirectToRoute } from '../actions';
import { redirect } from './redirect';

const fakeHistory = {
  location: {
    pathname: ''
  },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory );

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', ()=> {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login));

    expect(fakeHistory.location.pathname).toBe(AppRoute.Login);

    expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Login)]);
  });

  it('should not redirect when action is incorrect', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.Room });

    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Room);
    expect(fakeHistory.location.pathname).toBe('');
  });
});

import { AuthorizationStatus } from '../../consts/app';
import { UserProcess } from '../../types/state';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userProcess } from './user-process';

const userData = makeFakeUserData();

describe('Reducer: user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" and fill user data if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: userData }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          user: userData,
        });
    });

    it('should update authorizationStatus to "NO_AUTH" and update user data to "null" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          user: null,
        });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" and fill user data if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: userData }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.Auth,
          user: userData,
        });
    });
    it('should update authorizationStatus to "NO_AUTH" and update user data to "null" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          user: null,
        });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" and update user data to "null" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          user: null,
        });
    });
  });
});

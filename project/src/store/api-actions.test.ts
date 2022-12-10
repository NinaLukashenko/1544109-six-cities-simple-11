import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { APIRoute } from '../consts/api';
import { createApi } from '../services/api';
import { AUTH_TOKEN_KEY_NAME } from '../services/token';
import { State } from '../types/state';
import { AuthUser } from '../types/user';
import { makeFakeComments, makeFakeOffer, makeFakeOffers, makeFakeUserData } from '../utils/mocks';
import { redirectToRoute } from './actions';
import { checkAuthAction, fetchCommentsAction, fetchOfferByIdAction, fetchOffersAction, fetchOffersNearbyAction, loginAction, logoutAction, saveCommentAction } from './api-actions';

describe('Async actions', () => {
  const api = createApi();
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch FetchOffers when GET /offers', async () => {
    const store = mockStore();

    const mockOffers = makeFakeOffers();

    mockApi
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  describe('current offer', () => {
    const mockOffer = makeFakeOffer(1);
    const mockOfferId = mockOffer.id;

    it('should dispatch FetchOfferById when GET /offers/id', async () => {
      const store = mockStore();

      mockApi
        .onGet(`${APIRoute.Offers}/${mockOfferId}`)
        .reply(200, mockOffer);

      await store.dispatch(fetchOfferByIdAction(mockOfferId));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchOfferByIdAction.pending.type,
        fetchOfferByIdAction.fulfilled.type,
      ]);
    });

    it('should dispatch FetchComments when GET /comments/offerId', async () => {
      const store = mockStore();

      const mockComments = makeFakeComments();

      mockApi
        .onGet(`${APIRoute.Comments}/${mockOfferId}`)
        .reply(200, mockComments);

      await store.dispatch(fetchCommentsAction(mockOfferId));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
    });

    it('should dispatch SaveComment when POST /comments/offerId', async () => {
      const store = mockStore();

      const newCommentData = { hotelId: 1, review: 'text text text', rating: 5 };

      const mockComments = makeFakeComments();

      mockApi
        .onPost(`${APIRoute.Comments}/${newCommentData.hotelId}`)
        .reply(200, mockComments);

      await store.dispatch(saveCommentAction(newCommentData));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        saveCommentAction.pending.type,
        saveCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch FetchOffersNearby when GET /offers/offerId/nearby', async () => {
      const store = mockStore();

      const mockOffersNearby = makeFakeOffers();

      mockApi
        .onGet(`${APIRoute.Offers}/${mockOfferId}${APIRoute.Nearby}`)
        .reply(200, mockOffersNearby);

      await store.dispatch(fetchOffersNearbyAction(mockOfferId));

      const actions = store.getActions().map(({ type }) => type);

      expect(actions).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.fulfilled.type,
      ]);
    });
  });

  it('should dispatch CheckAuth when GET /login', async () => {
    const store = mockStore();

    const fakeUser: AuthUser = makeFakeUserData();

    mockApi
      .onGet(APIRoute.Login)
      .reply(200, fakeUser);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch Login and RedirectToRoute when POST /login', async () => {
    const store = mockStore();

    const authData = {login: 'test@test.com', password: '123456'};
    const fakeUser: AuthUser = makeFakeUserData();

    mockApi
      .onPost(APIRoute.Login)
      .reply(200, fakeUser);

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(authData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, fakeUser.token );
  });

  it('should dispatch Logout when DELETE /logout', async () => {
    const store = mockStore();

    mockApi
      .onDelete(APIRoute.Logout)
      .reply(204);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});

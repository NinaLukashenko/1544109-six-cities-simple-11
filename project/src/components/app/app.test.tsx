import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../consts/app';
import { DEFAULT_CITY } from '../../consts/city';
import { DEFAULT_SORT_OPTION } from '../../consts/sort';
import { makeFakeComments, makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import App from './app';
import { render, screen } from '@testing-library/react';
import thunk from 'redux-thunk';

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockStoreData = {
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
  },
  OFFERS: {
    city: DEFAULT_CITY,
    isLoading: false,
    offers: makeFakeOffers(),
    sort: DEFAULT_SORT_OPTION,
    hoveredOffer: null,
  },
  CURRENT_OFFER: {
    isLoading: false,
    offer: makeFakeOffer(1),
    comments: makeFakeComments(),
    isCommentSending: false,
    isResetingCommentForm: false,
    offersNearby: makeFakeOffers(),
  }
};

const store = mockStore(mockStoreData);

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main page" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(new RegExp(`places to stay in ${mockStoreData.OFFERS.city.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });

  it('should render "Login page" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getAllByText(new RegExp(/Sign in/i))).toHaveLength(2);
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Room page" when user navigate to "/offer"', () => {
    history.push(`${AppRoute.Room}/${mockStoreData.CURRENT_OFFER.offer.id}`);

    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render "404 page" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Вернуться на главную/i)).toBeInTheDocument();
  });
});

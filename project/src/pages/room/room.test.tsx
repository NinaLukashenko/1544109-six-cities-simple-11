import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../components/history-route/history-route';
import { AppRoute, AuthorizationStatus } from '../../consts/app';
import { makeFakeComments, makeFakeOffer } from '../../utils/mocks';
import Room from './room';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const mockOffer = makeFakeOffer(1);
const mockComments = makeFakeComments();
const mockOffersNearby = [makeFakeOffer(2), makeFakeOffer(3), makeFakeOffer(4)];

describe('Component: Room', () => {
  it('should render correctly Premium Room', () => {
    mockOffer.isPremium = true;
    mockOffer.rating = 3.7;

    const mockStoreData = {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      CURRENT_OFFER: {
        isLoading: false,
        offer: mockOffer,
        comments: mockComments,
        isCommentSending: false,
        isResetingCommentForm: false,
        offersNearby: mockOffersNearby,
      }
    };

    const store = mockStore(mockStoreData);

    history.push(`${AppRoute.Room}/1`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Room />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/404. Page not found/i)).not.toBeInTheDocument();

    expect(screen.getByTestId('premium')).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBeGreaterThan(0);
    expect(screen.getByText(new RegExp(mockOffer.title))).toBeInTheDocument();
    expect(screen.getByTestId('room-rating').getAttribute('style')).toBe('width: 80%;');
    expect(screen.getAllByText(/Rating/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(new RegExp(mockOffer.type, 'i')).length).toBeGreaterThan(0);
    expect(screen.getByText(new RegExp(`${mockOffer.bedrooms} Bedroom`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Max ${mockOffer.maxAdults} adult`, 'i'))).toBeInTheDocument();
    expect(screen.getAllByTestId('inside-item')).toHaveLength(mockOffer.goods.length);
    expect(screen.getAllByText(/night/i).length).toBeGreaterThan(0);
    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockOffer.description, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByTestId('map')).not.toBeEmptyDOMElement();
    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
    expect(screen.getByTestId('nearby-offer-list')).toBeInTheDocument();
  });

  it('should render correctly not Premium Room', () => {
    mockOffer.isPremium = false;

    const mockStoreData = {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      CURRENT_OFFER: {
        isLoading: false,
        offer: mockOffer,
        comments: mockComments,
        isCommentSending: false,
        isResetingCommentForm: false,
        offersNearby: mockOffersNearby,
      }
    };

    const store = mockStore(mockStoreData);

    history.push(`${AppRoute.Room}/1`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Room />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByTestId('premium')).not.toBeInTheDocument();
  });

  it('should render Loader when isOfferLoading = true', () => {
    const mockStoreData = {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      CURRENT_OFFER: {
        isLoading: true,
        offer: mockOffer,
        comments: mockComments,
        isCommentSending: false,
        isResetingCommentForm: false,
        offersNearby: mockOffersNearby,
      }
    };

    const store = mockStore(mockStoreData);

    history.push(`${AppRoute.Room}/1`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Room />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/404. Page not found/i)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockOffer.title))).not.toBeInTheDocument();
  });

  it('should render 404 when offer = null', () => {
    const mockStoreData = {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      CURRENT_OFFER: {
        isLoading: false,
        offer: null,
        comments: mockComments,
        isCommentSending: false,
        isResetingCommentForm: false,
        offersNearby: mockOffersNearby,
      }
    };

    const store = mockStore(mockStoreData);

    history.push(`${AppRoute.Room}/1`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Room />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockOffer.title))).not.toBeInTheDocument();
  });
});

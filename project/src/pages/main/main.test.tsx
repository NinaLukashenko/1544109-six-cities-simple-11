import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../consts/app';
import { DEFAULT_CITY_INDEX } from '../../consts/city';
import { DEFAULT_SORT_OPTION } from '../../consts/sort';
import { makeFakeCity, makeFakeOffer } from '../../utils/mocks';
import Main from './main';

const mockCity = makeFakeCity(DEFAULT_CITY_INDEX);
const mockOffers = [ makeFakeOffer(1, DEFAULT_CITY_INDEX), makeFakeOffer(2, DEFAULT_CITY_INDEX)];

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null,
  },
  OFFERS: {
    city: mockCity,
    isLoading: false,
    sort: DEFAULT_SORT_OPTION,
    offers: mockOffers,
    hoveredOffer: null,
  },
});
const history = createMemoryHistory();

describe('Component: Main', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Main />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByTestId('city-list')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${mockOffers.length} places to stay in ${mockCity.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});

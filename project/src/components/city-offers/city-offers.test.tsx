import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { DEFAULT_CITY, DEFAULT_CITY_INDEX } from '../../consts/city';
import { DEFAULT_SORT_OPTION } from '../../consts/sort';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CityOffers from './city-offers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockCity = DEFAULT_CITY;

const history = createMemoryHistory();

describe('Component: CityOfferList', () => {
  it('should render correctly if there are some offers in the current city', () => {
    const mockStoreData = {
      OFFERS: {
        city: mockCity,
        offers: [ makeFakeOffer(1, DEFAULT_CITY_INDEX), makeFakeOffer(2, DEFAULT_CITY_INDEX)],
        sort: DEFAULT_SORT_OPTION,
      }
    };

    const store = mockStore(mockStoreData);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityOffers />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${mockStoreData.OFFERS.offers.length} places to stay in ${mockCity.name}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(mockStoreData.OFFERS.offers.length);

    expect(screen.queryByText(/No places to stay available/i)).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(`We could not find any property available at the moment in ${mockCity.name}`, 'i'))).not.toBeInTheDocument();
  });

  it('should render CityNoPlaces Component if there are not any offers', () => {
    const mockStoreData = {
      OFFERS: {
        city: mockCity,
        offers: [makeFakeOffer(1, 1), makeFakeOffer(2, 1)],
      }
    };

    const store = mockStore(mockStoreData);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityOffers />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${mockCity.name}`, 'i'))).toBeInTheDocument();

    expect(screen.queryByText(new RegExp(`${mockStoreData.OFFERS.offers.length} places to stay in ${mockCity.name}`, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(/Sort by/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { SortOption } from '../../consts/sort';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import CityOfferList from './city-offer-list';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  OFFERS: {
    sort: SortOption.Rating,
    offers: [],
  }
});

const history = createMemoryHistory();

const mockOffers = makeFakeOffers();

describe('Component: CityOfferList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityOfferList offers={mockOffers} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('places-list')).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(mockOffers.length);
  });

  it('should dispatch changeHoveredOffer when an offer was hovered', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityOfferList offers={mockOffers} />
        </HistoryRouter>
      </Provider>
    );

    expect(store.getActions()).toEqual([]);

    await userEvent.hover(screen.getAllByRole('article')[0]);

    expect(store.getActions()[0].type).toBe('OFFERS/changeHoveredOffer');

  });

  it('should dispatch changeHoveredOffer when an offer was unhovered', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityOfferList offers={mockOffers} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.unhover(screen.getAllByRole('article')[0]);

    expect(store.getActions()).toHaveLength(2);

    const actions = store.getActions().map(({ type }) => type as string);

    expect(actions).toEqual([
      'OFFERS/changeHoveredOffer',
      'OFFERS/changeHoveredOffer'
    ]);

  });
});

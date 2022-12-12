import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import NearbyOfferList from './nearby-offer-list';

const mockStore = configureMockStore();

const mockOffersNearby = makeFakeOffers();

const store = mockStore({
  CURRENT_OFFER: {
    offersNearby: mockOffersNearby,
  }
});

const history = createMemoryHistory();

describe('Component: NearbyCityOfferList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NearbyOfferList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('nearby-offer-list')).toBeInTheDocument();
    expect(screen.getByTestId('nearby-offer-list').getAttribute('class')).toBe('near-places__list places__list');
    expect(screen.getAllByRole('article')).toHaveLength(mockOffersNearby.length);
  });
});

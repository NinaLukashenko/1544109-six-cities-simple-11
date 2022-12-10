import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeFakeOffers } from '../../utils/mocks';
import NearbyOfferList from './nearby-offer-list';

const mockStore = configureMockStore();

const mockOffersNearby = makeFakeOffers();

const store = mockStore({
  CURRENT_OFFER: {
    offersNearby: mockOffersNearby,
  }
});

describe('Component: CityOfferList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <NearbyOfferList />
      </Provider>
    );

    expect(screen.getByTestId('nearby-offer-list')).toBeInTheDocument();
    expect(screen.getByTestId('nearby-offer-list').getAttribute('class')).toBe('near-places__list places__list');
    expect(screen.getAllByRole('article')).toHaveLength(mockOffersNearby.length);
  });
});

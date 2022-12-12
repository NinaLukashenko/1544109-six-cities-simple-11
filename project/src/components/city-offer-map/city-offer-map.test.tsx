import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeFakeCity, makeFakeOffers } from '../../utils/mocks';
import CityOfferMap from './city-offer-map';

const mockCity = makeFakeCity(0);
const mockPoints = makeFakeOffers();
const mockHoveredOffer = mockPoints[0];

const mockStore = configureMockStore();
const store = mockStore({
  OFFERS: {
    hoveredOffer: mockHoveredOffer,
  },
});

describe('Component: CityOfferMap', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CityOfferMap
          city={mockCity}
          points={mockPoints}
        />
      </Provider>
    );

    expect(screen.getByTestId('map-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('map')).not.toBeEmptyDOMElement();
  });
});

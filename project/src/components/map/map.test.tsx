import { render, screen } from '@testing-library/react';
import { makeFakeCity, makeFakeOffers } from '../../utils/mocks';
import Map from './map';

const mockCity = makeFakeCity(0);
const mockPoints = makeFakeOffers();
const mockSelectedPoint = mockPoints[0];

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Map
        city={mockCity}
        points={mockPoints}
        selectedPoint={mockSelectedPoint}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('map')).not.toBeEmptyDOMElement();
  });
});

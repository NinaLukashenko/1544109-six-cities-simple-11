import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import CityPlace from './city-place';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const mockPlace = makeFakeOffer(1);
const history = createMemoryHistory();

const fakeOnHover = jest.fn();
const fakeOnUnhover = jest.fn();


describe('Component: CityPlace', () => {
  mockPlace.rating = 3.7;
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <CityPlace
          place={mockPlace}
          onHover={fakeOnHover}
          onUnhover={fakeOnUnhover}
        />
      </HistoryRouter>
    );

    const article = screen.getByRole('article');

    expect(article).toBeInTheDocument();
    expect(article).toHaveClass('cities__card');
    expect(screen.getByAltText(mockPlace.title)).toBeInTheDocument();
  });
});

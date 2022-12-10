import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import Place from './place';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts/app';

const mockPlace = makeFakeOffer(1);

const fakePlaceHoverHandler = jest.fn();
const fakePlaceUnhoverHandler = jest.fn();

const history = createMemoryHistory();

describe('Component: Place', () => {
  mockPlace.rating = 3.7;
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Place
          place={mockPlace}
          className='fake-class-name'
          onHover={fakePlaceHoverHandler}
          onUnhover={fakePlaceUnhoverHandler}
        />
      </HistoryRouter>
    );

    expect(screen.getByRole('article')).toHaveClass('fake-class-name');

    expect(screen.getByAltText(mockPlace.title)).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(screen.getByText(new RegExp(mockPlace.price.toString()))).toBeInTheDocument();
    expect(screen.getByText(/night/i)).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toHaveStyle('width: 80%');
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockPlace.type, 'i'))).toBeInTheDocument();
  });

  it('should render correctly for Premium = true', () => {
    mockPlace.isPremium = true;

    render(
      <HistoryRouter history={history}>
        <Place
          place={mockPlace}
          className='fake-class-name'
          onHover={fakePlaceHoverHandler}
          onUnhover={fakePlaceUnhoverHandler}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });

  it('should render correctly for Premium = false', () => {
    mockPlace.isPremium = false;

    render(
      <HistoryRouter history={history}>
        <Place
          place={mockPlace}
          className='fake-class-name'
          onHover={fakePlaceHoverHandler}
          onUnhover={fakePlaceUnhoverHandler}
        />
      </HistoryRouter>
    );

    expect(screen.queryByText(/Premium/i)).not.toBeInTheDocument();
  });

  it('fakePlaceHoverHandler should be called when user hovers the card', async () => {
    render(
      <HistoryRouter history={history}>
        <Place
          place={mockPlace}
          className='fake-class-name'
          onHover={fakePlaceHoverHandler}
          onUnhover={fakePlaceUnhoverHandler}
        />
      </HistoryRouter>
    );

    await userEvent.hover(screen.getByRole('article'));

    expect(fakePlaceHoverHandler).toBeCalled();
    expect(fakePlaceHoverHandler).nthCalledWith(1, mockPlace);
  });

  it('fakePlaceUnhoverHandler should be called when user unhovers the card', async () => {
    render(
      <HistoryRouter history={history}>
        <Place
          place={mockPlace}
          className='fake-class-name'
          onHover={fakePlaceHoverHandler}
          onUnhover={fakePlaceUnhoverHandler}
        />
      </HistoryRouter>
    );

    await userEvent.unhover(screen.getByRole('article'));

    expect(fakePlaceUnhoverHandler).toBeCalledTimes(1);
  });

  it('should redirect when user clicked the image', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`${AppRoute.Room}/${mockPlace.id}`}
            element={<h1>This is a place deatails page.</h1>}
          />
          <Route
            path='*'
            element={
              <Place
                place={mockPlace}
                className='fake-class-name'
                onHover={fakePlaceHoverHandler}
                onUnhover={fakePlaceUnhoverHandler}
              />
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is a place deatails page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('place-image'));

    expect(screen.getByText(/This is a place deatails page/i)).toBeInTheDocument();
  });

  it('should redirect when user clicked the title', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={`${AppRoute.Room}/${mockPlace.id}`}
            element={<h1>This is a place deatails page.</h1>}
          />
          <Route
            path="*"
            element={
              <Place
                place={mockPlace}
                className='fake-class-name'
                onHover={fakePlaceHoverHandler}
                onUnhover={fakePlaceUnhoverHandler}
              />
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is a place deatails page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByTestId('place-title'));

    expect(screen.getByText(/This is a place deatails page/i)).toBeInTheDocument();
  });

});

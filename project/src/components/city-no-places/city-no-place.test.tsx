import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import CityNoPlace from './city-no-places';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CityNoPlace', () => {
  it('should render correctly', () => {
    const store = mockStore({
      OFFERS: {
        city: {
          location: {
            latitude: 53.551086,
            longitude: 9.993682,
            zoom: 10
          },
          name: 'Hamburg',
        }
      }
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CityNoPlace/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Hamburg/i)).toBeInTheDocument();
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { cities, CityName } from '../../consts/city';
import CityList from './city-list';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const AMSTERDAM_CITY_INDEX = 3;
const COLOGNE_CITY_INDEX = 1;

const store = mockStore({
  OFFERS: {
    city: {
      location: {
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 10
      },
      name: CityName.Amsterdam,
    }
  }
});

describe('Component: CityList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(cities.length);
    expect(screen.getAllByRole('link')).toHaveLength(cities.length);
    expect(screen.getAllByRole('link')[AMSTERDAM_CITY_INDEX]).toHaveClass('tabs__item--active');
    expect(screen.getAllByRole('link')[COLOGNE_CITY_INDEX]).not.toHaveClass('tabs__item--active');
  });

  it('when user clicked another city changeCity was dispatched', async () => {
    render(
      <Provider store={store}>
        <CityList />
      </Provider>
    );

    await userEvent.click(screen.getAllByRole('link')[COLOGNE_CITY_INDEX]);

    const actions = store.getActions();

    expect(actions[0].type).toBe('OFFERS/changeCity');
  });

});

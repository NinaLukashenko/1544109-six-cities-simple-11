import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import Sort from './sort';

const mockStore = configureMockStore();

describe('Component: Sort', () => {
  it('should render correctly', () => {
    const store = mockStore({
      OFFERS: {
        sort: 'Top rated first',
      }
    });

    render(
      <Provider store={store}>
        <Sort/>
      </Provider>
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByText('Top rated first')).toHaveLength(2);
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('handleSortByClick should be called when user clicked sort options list', async () => {
    const store = mockStore({
      OFFERS: {
        sort: 'Top rated first',
      }
    });

    render(
      <Provider store={store}>
        <Sort/>
      </Provider>
    );

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('selected-option'));

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
  });

  it('handleSortOptionSelect should be called when user selected the sort option', async () => {
    const store = mockStore({
      OFFERS: {
        sort: 'Top rated first',
      }
    });

    render(
      <Provider store={store}>
        <Sort/>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('selected-option'));

    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('sort-options'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('OFFERS/changeSortOption');

    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });
});

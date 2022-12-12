import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import NavNotAuth from './nav-not-auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});
const history = createMemoryHistory();

describe('Component: HeaderNavNotAuth', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <NavNotAuth />
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in')).toBeInTheDocument();
  });

  it('when user has cliked "Sign in" should redirect to "/login"', async () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <NavNotAuth />
      </Provider>
    );

    await userEvent.click(screen.getByTestId('sign-in'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('auth/redirectToRoute');
  });
});

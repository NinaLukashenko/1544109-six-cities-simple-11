import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../../components/history-router/history-router';
import { AppRoute } from '../../consts/app';
import Login from './login';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const store = mockStore({});
const history = createMemoryHistory();

describe('Component: Login', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });

  it('should render "Login" when user navigate to "login" url', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Login />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(screen.getByAltText(/6 cities/i)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it('should redirect to "/" when user clicked a city link', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Routes>
              <Route
                path={AppRoute.Login}
                element={<Login />}
              />
              <Route
                path={AppRoute.Main}
                element={<h1>Mock Main Page</h1>}
              />
            </Routes>
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);

    await userEvent.click(screen.getByTestId('city'));

    expect(screen.getByText(/Mock Main Page/i)).toBeInTheDocument();
  });
});

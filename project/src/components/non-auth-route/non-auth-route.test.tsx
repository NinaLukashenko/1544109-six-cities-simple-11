import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/app';
import HistoryRouter from '../history-route/history-route';
import NonAuthRoute from './non-auth-route';

const history = createMemoryHistory();

describe('Component: NonAuthRoute', () => {
  beforeEach(() => {
    history.push('/non-auth');
  });

  it('should render component for "Public Route" when user is authorized', () => {
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<h1>Public Route</h1>}
          />
          <Route
            path='/non-auth'
            element={
              <NonAuthRoute authorizationStatus={AuthorizationStatus.Auth}>
                <h1>Non-Auth Route</h1>
              </NonAuthRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText('Public Route')).toBeInTheDocument();
    expect(screen.queryByText('Non-Auth Route')).not.toBeInTheDocument();
  });

  it('should render component for "Non-Auth Route" when user is not authorized', () => {

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<h1>Public Route</h1>}
          />
          <Route
            path='/non-auth'
            element={
              <NonAuthRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <h1>Non-Auth Route</h1>
              </NonAuthRoute>
            }
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText('Non-Auth Route')).toBeInTheDocument();
    expect(screen.queryByText('Public Route')).not.toBeInTheDocument();
  });
});

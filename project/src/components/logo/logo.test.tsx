import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from '../history-router/history-router';
import userEvent from '@testing-library/user-event';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo/>
      </HistoryRouter>
    );

    expect(screen.getByAltText(/6 cities/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root url when user clicked to link', async () => {
    history.push('/fake');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path="/"
            element={<h1>This is a main page.</h1>}
          />
          <Route
            path="*"
            element={<Logo/>}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByText(/This is a main page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is a main page/i)).toBeInTheDocument();
  });
});

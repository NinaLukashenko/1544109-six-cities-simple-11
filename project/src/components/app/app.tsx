import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import browserHistory from '../../browser-history';
import PrivateRoute from '../../components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../consts/app';
import { useAppSelector } from '../../hooks';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import { getIsLoading, getOffers } from '../../store/offers-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Cities } from '../../types/city';
import HistoryRouter from '../history-route/history-route';
import Loader from '../loader/loader';

type AppProps = {
  cities: Cities;
}

const App = ({ cities }: AppProps): JSX.Element => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getIsLoading);

  if (authStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <Main
                cities={cities}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                authorizationStatus={authStatus}
              >
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path={`${AppRoute.Room}/:id`}
            element={<Room />}
          />
          <Route
            path='*'
            element={<NotFound />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
};

export default App;

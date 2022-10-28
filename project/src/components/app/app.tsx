import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../../components/private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import { Offers } from '../../types/offers';

type AppProps = {
  placesCount: number;
  offers: Offers;
}

const App = ({ placesCount, offers }: AppProps): JSX.Element => (
  <HelmetProvider>
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main placesCount={placesCount} offers={offers} />}
        />
        <Route
          path={AppRoute.Login}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
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
    </BrowserRouter>
  </HelmetProvider>
);

export default App;

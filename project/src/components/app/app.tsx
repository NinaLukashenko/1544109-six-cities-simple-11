import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../consts/app';
import { useAppSelector } from '../../hooks';
import Loader from '../../pages/loader/loader';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found/not-found';
import Room from '../../pages/room/room';
import { getIsLoading } from '../../store/offers-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import NonAuthRoute from '../non-auth-route/non-auth-route';


const App = (): JSX.Element => {
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isOffersLoading = useAppSelector(getIsLoading);

  if (authStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <Loader />;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main />
          }
        />
        <Route
          path={AppRoute.Login}
          element={
            <NonAuthRoute
              authorizationStatus={authStatus}
            >
              <Login />
            </NonAuthRoute>
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
    </HelmetProvider>
  );
};

export default App;

import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../consts/app';

type NonAuthRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

const NonAuthRoute = ({ authorizationStatus, children }: NonAuthRouteProps): JSX.Element => (
  authorizationStatus === AuthorizationStatus.NoAuth
    ? children
    : <Navigate to={AppRoute.Main} />
);

export default NonAuthRoute;

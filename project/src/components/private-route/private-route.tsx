import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../consts/const';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

const PrivateRoute = ({ authorizationStatus, children }: PrivateRouteProps): JSX.Element => (
  authorizationStatus !== AuthorizationStatus.Auth
    ? children
    : <Navigate to={AppRoute.Main} />
);

export default PrivateRoute;

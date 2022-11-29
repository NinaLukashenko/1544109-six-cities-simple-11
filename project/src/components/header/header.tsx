import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../consts/app';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUser } from '../../store/user-process/selectors';
import HeaderNavAuth from '../header-nav-auth/header-nav-auth';
import HeaderNavNotAuth from '../header-nav-not-auth/header-nav-not-auth';
import Logo from '../logo/logo';

const Header = (): JSX.Element => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);

  const location = useLocation();

  const classes = location.pathname === AppRoute.Main ? 'header__logo-link--active' : '';

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo className={classes} />
          </div>
          { authorizationStatus && user
            ? <HeaderNavAuth user={user}/>
            : <HeaderNavNotAuth />}
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useAppSelector } from '../../hooks';
import HeaderNavAuth from '../header-nav-auth/header-nav-auth';
import HeaderNavNotAuth from '../header-nav-not-auth/header-nav-not-auth';
import Logo from '../logo/logo';

const Header = (): JSX.Element => {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo className='header__logo-link--active' />
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

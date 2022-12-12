import { MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AuthUser } from '../../types/user';

type NavAuthProps = {
  user: AuthUser;
}

const NavAuth = ({ user: { email } }: NavAuthProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleSignoutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <div className="header__nav-profile">
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">{email}</span>
          </div>
        </li>
        <li className="header__nav-item">
          <a
            className="header__nav-link"
            href="#"
            onClick={handleSignoutClick}
          >
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavAuth;

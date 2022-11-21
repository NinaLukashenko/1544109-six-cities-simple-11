import { useAppDispatch } from '../../hooks';
import { MouseEvent } from 'react';
import { AppRoute } from '../../consts/app';
import { redirectToRoute } from '../../store/actions';

const HeaderNavNotAuth = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleSigninClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(redirectToRoute(AppRoute.Login));
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <a
            className="header__nav-link header__nav-link--profile"
            href="#"
            onClick={handleSigninClick}
          >
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__login">Sign in</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavNotAuth;

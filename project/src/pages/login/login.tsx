import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/login-form/login-form';
import Logo from '../../components/logo/logo';
import { AppRoute } from '../../consts/app';
import { DEFAULT_CITY_INDEX, cities, LAST_CITY_INDEX } from '../../consts/city';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/offers-data/offers-data';
import { getRandomNumber } from '../../utils/utils';

const Login = () => {
  const cityIndex = getRandomNumber(DEFAULT_CITY_INDEX, LAST_CITY_INDEX);

  const city = cities[cityIndex];

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeCity(city));
  }, [city, dispatch]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 Cities. Authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main} data-testid="city">
                <span>{city.name}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div >
  );
};

export default Login;

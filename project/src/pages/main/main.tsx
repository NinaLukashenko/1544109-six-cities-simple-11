import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CityList from '../../components/city-list/city-list';
import CityNoPlaces from '../../components/city-no-places/city-no-places';
import CityOfferList from '../../components/city-offer-list/city-offer-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import Sort from '../../components/sort/sort';
import { useAppSelector } from '../../hooks';
import { Cities } from '../../types/city';
import { Offer } from '../../types/offers';
import { Nullable } from '../../types/utils';

type MainProps = {
  cities: Cities;
}

const Main = ({ cities }: MainProps): JSX.Element => {
  const [activeCard, setActiveCard] = useState<Nullable<Offer>>(null);

  const currentCity = useAppSelector((state) => state.city);

  const offers = useAppSelector((state) => state.offers.filter((offer) => offer.city.name === currentCity.name));

  const placesCount = offers.length;

  const handleCardHover = (place: Offer): void => {
    setActiveCard((state) => place);
  };

  const handleCardUnhover = (): void => {
    setActiveCard((state) => (null));
  };

  return (
    <div className={`page page--gray page--main ${!placesCount ? 'page__main--index-empty' : ''}`}>
      <Helmet>
        <title>6 Cities. Places</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo className='header__logo-link--active' />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <div className="header__nav-profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </div>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList cities={cities} currentCity={currentCity} />
          </section>
        </div>
        <div className="cities">
          {!!placesCount && (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{placesCount} places to stay in {currentCity.name}</b>
                <Sort />
                <CityOfferList
                  offers={offers}
                  onHover={handleCardHover}
                  onUnhover={handleCardUnhover}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  city={currentCity}
                  points={offers}
                  selectedPoint={activeCard}
                />
              </div>
            </div>
          )}
          {!placesCount && <CityNoPlaces />}
        </div>
      </main>
    </div>
  );
};

export default Main;

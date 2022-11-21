import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CityList from '../../components/city-list/city-list';
import CityNoPlaces from '../../components/city-no-places/city-no-places';
import CityOfferList from '../../components/city-offer-list/city-offer-list';
import Header from '../../components/header/header';
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
      <Header/>

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

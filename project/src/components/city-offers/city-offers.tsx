import { useAppSelector } from '../../hooks';
import { getCity, getOffers } from '../../store/offers-data/selectors';
import CityNoPlaces from '../city-no-places/city-no-places';
import CityOfferList from '../city-offer-list/city-offer-list';
import CityOfferMap from '../city-offer-map/city-offer-map';
import Sort from '../sort/sort';

const CityOffers = () => {
  const currentCity = useAppSelector(getCity);

  const offers = useAppSelector(getOffers);

  const filteredOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  const placesCount = filteredOffers.length;

  return (
    <div className="cities">
      {!!placesCount && (
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placesCount} places to stay in {currentCity.name}</b>
            <Sort />
            <CityOfferList
              offers={filteredOffers}
            />
          </section>
          <div className="cities__right-section">
            <CityOfferMap
              city={currentCity}
              points={filteredOffers}
            />
          </div>
        </div>
      )}
      {!placesCount && <CityNoPlaces />}
    </div>
  );
};

export default CityOffers;

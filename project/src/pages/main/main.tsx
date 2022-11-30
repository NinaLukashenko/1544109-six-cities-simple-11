import { Helmet } from 'react-helmet-async';
import CityList from '../../components/city-list/city-list';
import CityOffers from '../../components/city-offers/city-offers';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getCity, getOffers } from '../../store/offers-data/selectors';
import { Cities } from '../../types/city';

type MainProps = {
  cities: Cities;
}

const Main = ({ cities }: MainProps): JSX.Element => {
  const currentCity = useAppSelector(getCity);

  const offers = useAppSelector(getOffers);

  const filteredOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  const placesCount = filteredOffers.length;

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
            <CityList/>
          </section>
        </div>
        <CityOffers/>
      </main>
    </div>
  );
};

export default Main;

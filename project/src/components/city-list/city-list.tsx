import { MouseEvent } from 'react';
import { cities, CityName } from '../../consts/city';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/offers-data/offers-data';
import { getCity } from '../../store/offers-data/selectors';
import { City } from '../../types/offers';

const CityList = (): JSX.Element => {
  const currentCity = useAppSelector(getCity);
  const dispatch = useAppDispatch();

  const handleLocationChange = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const selectedCityName = evt.currentTarget.textContent as CityName;
    const selectedCity = cities.find((city) => city.name === selectedCityName ) as City;

    dispatch(changeCity(selectedCity));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city.name} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${city.name === currentCity.name ? 'tabs__item--active' : ''}`}
            href="#"
            onClick={handleLocationChange}
          >
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default CityList;

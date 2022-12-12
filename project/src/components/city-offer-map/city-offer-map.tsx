import { useAppSelector } from '../../hooks';
import { getHoveredOffer } from '../../store/offers-data/selectors';
import { City, Offers } from '../../types/offers';
import Map from '../map/map';

type CityOfferMapProps = {
  city: City;
  points: Offers;
}

const CityOfferMap = (props: CityOfferMapProps): JSX.Element => {
  const hoveredOffer = useAppSelector(getHoveredOffer);

  return (
    <div className="cities__right-section" data-testid="map-wrapper">
      <Map
        selectedPoint={hoveredOffer}
        {...props}
      />
    </div>
  );
};

export default CityOfferMap;

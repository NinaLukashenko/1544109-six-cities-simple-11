import { Offer } from '../../types/offers';
import Place from '../place/place';

type CityPlaceProps = {
  place: Offer;
  onHover: (place: Offer) => void;
  onUnhover: () => void;
}

const CityPlace = (props: CityPlaceProps): JSX.Element => (
  <Place className='cities__card' {...props} />
);

export default CityPlace;

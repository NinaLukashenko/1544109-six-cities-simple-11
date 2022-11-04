import { Offer } from '../../types/offers';
import Place from '../place/place';

type NearbyPlaceProps = {
  place: Offer;
}

const NearbyPlace = (props: NearbyPlaceProps): JSX.Element => (
  <Place className='near-places__card' {...props} />
);

export default NearbyPlace;

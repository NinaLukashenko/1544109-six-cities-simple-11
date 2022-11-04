import { Offers } from '../../types/offers';
import NearbyPlace from '../nearby-place/nearby-place';

type NearbyOfferListProps = {
  offers: Offers;
}

const NearbyOfferList = ({ offers }: NearbyOfferListProps): JSX.Element => (
  <div className='near-places__list places__list'>
    {offers.map((offer) => (
      <NearbyPlace key={offer.id} place={offer} />
    ))}
  </div>
);

export default NearbyOfferList;

import { useAppSelector } from '../../hooks';
import { getOffersNearby } from '../../store/current-offer-data/selectors';
import NearbyPlace from '../nearby-place/nearby-place';

const NearbyOfferList = (): JSX.Element => {
  const offers = useAppSelector(getOffersNearby);

  return (
    <div className='near-places__list places__list' data-testid="nearby-offer-list">
      {offers.map((offer) => (
        <NearbyPlace key={offer.id} place={offer} />
      ))}
    </div>
  );
};


export default NearbyOfferList;

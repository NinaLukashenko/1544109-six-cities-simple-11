import { Offer, Offers } from '../../types/offers';
import CityPlace from '../city-place/city-place';

type CityOfferListProps = {
  offers: Offers;
  onHover: (place: Offer) => void;
  onUnhover: () => void;
}

const CityOfferList = ({ offers, onHover, onUnhover }: CityOfferListProps): JSX.Element => (
  <div className='cities__places-list places__list tabs__content'>
    {offers.map((offer) => (
      <CityPlace key={offer.id} place={offer} onHover={onHover} onUnhover={onUnhover} />
    ))}
  </div>
);

export default CityOfferList;

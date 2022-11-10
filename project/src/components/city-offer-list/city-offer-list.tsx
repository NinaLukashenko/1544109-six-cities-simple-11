import { SortOption } from '../../consts/sort';
import { useAppSelector } from '../../hooks';
import { Offer, Offers } from '../../types/offers';
import CityPlace from '../city-place/city-place';

const sortOffers = (list: Offer[], sort: SortOption) => {
  switch (sort) {
    case SortOption.Rating:
      return [...list].sort((a, b) => a.rating < b.rating ? 1 : -1);
    case SortOption.PriceFromLowToHigh:
      return [...list].sort((a, b) => a.price > b.price ? 1 : -1);
    case SortOption.PriceFromHighLow:
      return [...list].sort((a, b) => a.price < b.price ? 1 : -1);
    default:
      return [...list];
  }
};

type CityOfferListProps = {
  offers: Offers;
  onHover: (place: Offer) => void;
  onUnhover: () => void;
}

const CityOfferList = ({ offers, onHover, onUnhover }: CityOfferListProps): JSX.Element => {
  const sort = useAppSelector((state) => state.sort);

  const sortedOffers = sortOffers(offers, sort);

  return (
    <div className='cities__places-list places__list tabs__content'>
      {sortedOffers.map((offer) => (
        <CityPlace key={offer.id} place={offer} onHover={onHover} onUnhover={onUnhover} />
      ))}
    </div>

  );
};

export default CityOfferList;

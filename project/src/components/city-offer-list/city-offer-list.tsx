import { useEffect, useRef, useState } from 'react';
import { SortOption } from '../../consts/sort';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeHoveredOffer } from '../../store/offers-data/offers-data';
import { getSort } from '../../store/offers-data/selectors';
import { Offer, Offers } from '../../types/offers';
import CityPlace from '../city-place/city-place';

const sortOffers = (sort: SortOption, list: Offers) => {
  switch (sort) {
    case SortOption.Rating:
      return [...list].sort((a, b) => a.rating < b.rating ? 1 : -1);
    case SortOption.PriceFromLowToHigh:
      return [...list].sort((a, b) => a.price > b.price ? 1 : -1);
    case SortOption.PriceFromHighLow:
      return [...list].sort((a, b) => a.price < b.price ? 1 : -1);
    case SortOption.Popular:
      return [...list];
  }
};

type CityOfferListProps = {
  offers: Offers;
}

const CityOfferList = ({ offers }: CityOfferListProps): JSX.Element => {
  const [sortedOffers, setSortedOffers] = useState(offers);

  const store = new Map<string, Offers>();
  const sortStore = useRef(store);

  const sort = useAppSelector(getSort);

  useEffect(() => {
    if (sortStore.current.size > 0) {
      sortStore.current.clear();
    }
  }, [offers]);

  useEffect(() => {
    const currentKey = sort;
    if (!sortStore.current.has(currentKey)) {
      const sorted = sortOffers(sort, offers);
      setSortedOffers((state) => sorted);
      sortStore.current.set(currentKey, sorted);
    } else {
      const sorted = sortStore.current.get(currentKey) as Offers;
      setSortedOffers((state) => sorted);
    }
  }, [sort, offers]);

  const dispatch = useAppDispatch();

  const onOfferHover = (place: Offer) => {
    dispatch(changeHoveredOffer(place));
  };

  const onOfferUnhover = () => {
    dispatch(changeHoveredOffer(null));
  };

  return (
    <div className='cities__places-list places__list tabs__content' data-testid="places-list">
      {sortedOffers.map((offer) => (
        <CityPlace key={offer.id} place={offer} onHover={onOfferHover} onUnhover={onOfferUnhover} />
      ))}
    </div>
  );
};

export default CityOfferList;

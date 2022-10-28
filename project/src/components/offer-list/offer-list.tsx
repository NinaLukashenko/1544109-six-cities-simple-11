import { useState } from 'react';
import { Offer, Offers } from '../../types/offers';
import Place from '../place/place';

type OfferListProps = {
  offers: Offers;
}

const OfferList = ({ offers }: OfferListProps): JSX.Element => {
  const [activeCard, setActiveCard] = useState({});

  const handleCardHover = (place: Offer): void => {
    setActiveCard((state) => place);
  };

  const handleCardUnhover = (): void => {
    setActiveCard((state) => ({}));
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((item) => (
        <Place
          key={item.id}
          place={item}
          onHover={handleCardHover}
          onUnhover={handleCardUnhover}
        />
      ))}
    </div>
  );
};

export default OfferList;

import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts/const';
import { Offer } from '../../types/offers';
import { getRatePercent, setFirstLetterUpper } from '../../utils/utils';

type PlaceProps = {
  place: Offer;
  className?: string;
  onHover?: (place: Offer) => void;
  onUnhover?: () => void;
}

const Place = ({ place, className = '', onHover, onUnhover }: PlaceProps): JSX.Element => {
  const handlePlaceHover = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if (onHover) {
      onHover(place);
    }
  };

  return (
    <article
      className={`${className} place-card`}
      onMouseEnter={handlePlaceHover}
      onMouseLeave={onUnhover}
    >
      {place.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Room}/${place.id}`}>
          <img className="place-card__image" src={place.previewImage} width="260" height="200" alt={place.title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${getRatePercent(place.rating)}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Room}/${place.id}`}>{place.title}</Link>
        </h2>
        <p className="place-card__type">{setFirstLetterUpper(place.type)}</p>
      </div>
    </article>
  );
};

export default Place;

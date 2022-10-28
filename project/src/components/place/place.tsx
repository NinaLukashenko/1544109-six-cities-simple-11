import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';
import { getRatePercent, setFirstLetterUpper } from '../../utils/utils';

type PlaceProps = {
  place: Offer;
  onHover: (place: Offer) => void;
  onUnhover: () => void;
}

const Place = ({ place, onHover, onUnhover }: PlaceProps): JSX.Element => (
  <article
    className="cities__card place-card"
    onMouseEnter={(evt: MouseEvent<HTMLElement>) => onHover(place)}
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

export default Place;

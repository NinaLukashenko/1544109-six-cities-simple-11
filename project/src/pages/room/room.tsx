import { Helmet } from 'react-helmet-async';
import { CommentForm } from '../../components/comment-form/comment-form';
import CommentList from '../../components/comment-list/comment-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import NearbyOfferList from '../../components/nearby-offer-list/nearby-offer-list';
import { offer as room } from '../../mocks/offer';
import { offersNearby } from '../../mocks/offers-nearby';
import { reviews } from '../../mocks/reviews';
import { getRatePercent, setFirstLetterUpper } from '../../utils/utils';

const Room = (): JSX.Element => (
  <div className="page">
    <Helmet>
      <title>6 Cities. Room</title>
    </Helmet>
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <div className="header__nav-profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </div>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">Sign out</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--property">
      <section className="property">
        <div className="property__gallery-container container">
          <div className="property__gallery">
            {room.images.map((image) => (
              <div key={image} className="property__image-wrapper">
                <img className="property__image" src={image} alt="Photo studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="property__container container">
          <div className="property__wrapper">
            {room.isPremium && (
              <div className="property__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="property__name-wrapper">
              <h1 className="property__name">
                {room.title}
              </h1>
            </div>
            <div className="property__rating rating">
              <div className="property__stars rating__stars">
                <span style={{ width: `${getRatePercent(room.rating)}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="property__rating-value rating__value">{room.rating}</span>
            </div>
            <ul className="property__features">
              <li className="property__feature property__feature--entire">
                {`${setFirstLetterUpper(room.type)}`}
              </li>
              <li className="property__feature property__feature--bedrooms">
                {room.bedrooms === 1 ? `${room.bedrooms} Bedroom` : `${room.bedrooms} Bedrooms`}
              </li>
              <li className="property__feature property__feature--adults">
                Max {room.maxAdults === 1 ? `${room.maxAdults} adult` : `${room.maxAdults} adults`}
              </li>
            </ul>
            <div className="property__price">
              <b className="property__price-value">&euro;{room.price}</b>
              <span className="property__price-text">&nbsp;night</span>
            </div>
            <div className="property__inside">
              <h2 className="property__inside-title">What&apos;s inside</h2>
              <ul className="property__inside-list">
                {room.goods.map((good) => (
                  <li key={good} className="property__inside-item">
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="property__host">
              <h2 className="property__host-title">Meet the host</h2>
              <div className="property__host-user user">
                <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="property__avatar user__avatar" src={room.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="property__user-name">
                  {room.host.name}
                </span>
                {room.host.isPro && (
                  <span className="property__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="property__description">
                <p className="property__text">
                  {room.description}
                </p>
              </div>
            </div>
            <section className="property__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
              <CommentList comments={reviews} />
              <CommentForm />
            </section>
          </div>
        </div>
        <section className="property__map map">
          <Map
            city={room.city}
            points={[...offersNearby, room]}
            selectedPoint={room}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <NearbyOfferList offers={offersNearby} />
        </section>
      </div>
    </main>
  </div>
);

export default Room;

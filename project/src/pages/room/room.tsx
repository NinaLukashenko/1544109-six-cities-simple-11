import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import Header from '../../components/header/header';
import Loader from '../loader/loader';
import Map from '../../components/map/map';
import NearbyOfferList from '../../components/nearby-offer-list/nearby-offer-list';
import Reviews from '../../components/reviews/reviews';
import { AuthorizationStatus } from '../../consts/app';
import { FIRST_OFFER_IMAGE_INDEX, OFFER_IMAGES_MAX_QUANTITY } from '../../consts/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction, fetchOfferByIdAction, fetchOffersNearbyAction } from '../../store/api-actions';
import { getIsLoading, getOffer, getOffersNearby } from '../../store/current-offer-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getRatePercent, setFirstLetterUpper } from '../../utils/utils';
import NotFound from '../not-found/not-found';

const Room = (): JSX.Element => {
  const { id } = useParams();

  const authStatus = useAppSelector(getAuthorizationStatus);
  const isOfferLoading = useAppSelector(getIsLoading);

  const room = useAppSelector(getOffer);
  const offersNearby = useAppSelector(getOffersNearby);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const offerId = Number(id);
    dispatch(fetchOfferByIdAction(offerId));
    dispatch(fetchCommentsAction(offerId));
    dispatch(fetchOffersNearbyAction(offerId));
  }, [dispatch, id]);

  if (authStatus === AuthorizationStatus.Unknown || isOfferLoading) {
    return <Loader />;
  }

  if (room === null) {
    return <NotFound />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 Cities. Room</title>
      </Helmet>
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {room.images.slice(FIRST_OFFER_IMAGE_INDEX, OFFER_IMAGES_MAX_QUANTITY).map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {room.isPremium && (
                <div className="property__mark" data-testid="premium">
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
                  <span style={{ width: `${getRatePercent(room.rating)}%` }} data-testid="room-rating"></span>
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
                    <li key={good} className="property__inside-item" data-testid="inside-item">
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
              <Reviews hotelId={Number(id)} className='property__reviews'/>
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
            <NearbyOfferList/>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Room;

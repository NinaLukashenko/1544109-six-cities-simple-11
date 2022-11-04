export const MAX_RATE_POINTS = 5;
export const MAX_RATE_PERCENT = 100;

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Room = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum OfferType {
  Apartment = 'apartment',
  PrivateRoom = 'room',
  House = 'house',
  Hotel = 'hotel',
}

export enum StarRating {
  None,
  OneStar,
  TwoStars,
  ThreeStars,
  FourStars,
  FiveStars,
}

export const MAP_MARKER = {
  ICON_WIDTH: 27,
  ICON_HEIGHT: 39,
  DEFAULT_ICON_URL: 'img/pin.svg',
  CURRECT_ICON_URL: 'img/pin-active.svg',
};

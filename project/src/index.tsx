import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offers, currentCity } from './mocks/offers';

enum Setting {
  PlacesCount = 310,
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      placesCount={Setting.PlacesCount}
      offers={offers}
      currentCity={currentCity}
    />
  </React.StrictMode>,
);

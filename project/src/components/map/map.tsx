import { Icon, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { MAP_MARKER } from '../../consts/map';
import useMap from '../../hooks/use-map';
import { Nullable } from '../../types/utils';
import { City, Offer, Offers } from '../../types/offers';

const { ICON_WIDTH, ICON_HEIGHT, DEFAULT_ICON_URL, CURRECT_ICON_URL } = MAP_MARKER;

const defaultCustomIcon = new Icon({
  iconUrl: DEFAULT_ICON_URL,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [+`${ICON_WIDTH / 2}`, ICON_HEIGHT],
});

const currentCustomIcon = new Icon({
  iconUrl: CURRECT_ICON_URL,
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [+`${ICON_WIDTH / 2}`, ICON_HEIGHT],
});

type MapProps = {
  city: City;
  points: Offers;
  selectedPoint: Nullable<Offer>;
}

const Map = ({ city, points, selectedPoint }: MapProps): JSX.Element => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      points.forEach((item) => {
        const marker = new Marker({
          lat: item.location.latitude,
          lng: item.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint && item.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return (
    <section
      ref={mapRef}
      className="cities__map map"
      style={{ height: '100%' }}
    >
    </section>
  );
};

export default Map;

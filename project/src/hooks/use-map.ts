import { Map, TileLayer } from 'leaflet';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Nullable } from '../types/utils';
import { City } from '../types/offers';

const useMap = (
  mapRef: MutableRefObject<Nullable<HTMLElement>>,
  city: City
): Nullable<Map> => {
  const [map, setMap] = useState<Nullable<Map>>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }
    map?.setView([city.location.latitude, city.location.longitude], city.location.zoom);
  }, [mapRef, city, map]);

  return map;
};

export default useMap;

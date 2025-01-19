import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Map({
  restaurants,
  selectedLocation,
  setSelectedLocation,
}: {
  restaurants: any[];
  selectedLocation: any;
  setSelectedLocation: React.Dispatch<React.SetStateAction<any>>;
}) {
  const mapContainer = useRef(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const markers = useRef<maptilersdk.Marker[]>([]);
  const popup = useRef<maptilersdk.Popup | null>(null);
  const location = { lng: -4.2583, lat: 55.8617 };
  const zoom = 14;

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current as unknown as HTMLElement,
      style: maptilersdk.MapStyle.STREETS,
      center: [location.lng, location.lat],
      zoom: zoom,
      maxZoom: 16,
      minZoom: 10,
    });

    markers.current = restaurants.map((restaurant) => {
      const marker = new maptilersdk.Marker({ color: "#FF0000" })
        .setLngLat([restaurant.longitude, restaurant.latitude])
        .setPopup(
          new maptilersdk.Popup().setHTML(
            `<strong>${restaurant.name}</strong><br>${restaurant.address}`
          )
        )
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => {
        setSelectedLocation(restaurant);
      });

      return marker;
    });
  }, [restaurants, setSelectedLocation]);

  useEffect(() => {
    if (!selectedLocation || !map.current) return;

    const matchingMarker = markers.current.find(
      (marker) =>
        marker.getLngLat().lng === selectedLocation.longitude &&
        marker.getLngLat().lat === selectedLocation.latitude
    );

    if (matchingMarker) {
      if (popup.current) {
        popup.current.remove();
      }

      popup.current = new maptilersdk.Popup({ offset: 25 })
        .setLngLat([selectedLocation.longitude, selectedLocation.latitude])
        .setHTML(
          `<strong>${selectedLocation.name}</strong><br>${selectedLocation.address}`
        )
        .addTo(map.current);

      map.current.flyTo({
        center: [selectedLocation.longitude, selectedLocation.latitude],
        zoom: 14,
        speed: 1.2,
      });
    }
  }, [selectedLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute h-full w-full" />
    </div>
  );
}

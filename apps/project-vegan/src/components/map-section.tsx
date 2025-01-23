import "@maptiler/sdk/dist/maptiler-sdk.css";
import * as maptilersdk from "@maptiler/sdk";
import React, { useRef, useEffect, useMemo } from "react";
import { Restaurant } from "@/content/restaurants_mocks";
import { getVeganIcon, fetchCoordinates } from "@/utils/mapUtils";

export default function MapSection({
  restaurants,
  selectedLocation,
  setSelectedLocation,
}: {
  restaurants: Restaurant[];
  selectedLocation: Restaurant | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Restaurant | null>>;
}) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const markers = useRef<maptilersdk.Marker[]>([]);
  const popup = useRef<maptilersdk.Popup | null>(null);

  const centerOfGlasgow = { lng: -4.2583, lat: 55.8617 };

  const location = useMemo(() => centerOfGlasgow, []);
  const zoom = useMemo(() => 14, []);

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;

  const initializeMap = () => {
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current as HTMLElement,
        style: maptilersdk.MapStyle.STREETS,
        center: [location.lng, location.lat],
        zoom: zoom,
        maxZoom: 18,
        minZoom: 13,
      });
    }
  };

  const updateMarkers = async () => {
    if (!map.current) return;

    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    const markerPromises = restaurants.map(async (restaurant) => {
      const coords = await fetchCoordinates(restaurant.address);
      if (!coords) return null;

      const veganIcon = document.createElement("img");
      veganIcon.src = getVeganIcon(restaurant.jRating);
      veganIcon.alt = "Vegan Icon";

      const marker = new maptilersdk.Marker({
        element: veganIcon,
      })
        .setLngLat([coords.lon, coords.lat])
        .addTo(map.current!);

      marker.getElement().addEventListener("click", () => {
        setSelectedLocation(restaurant);
      });

      return marker;
    });

    markers.current = (await Promise.all(markerPromises)).filter(
      (marker): marker is maptilersdk.Marker => marker !== null
    );
  };

  const updatePopup = async () => {
    if (!selectedLocation || !map.current) return;

    const coords = await fetchCoordinates(selectedLocation.address);
    if (!coords) {
      console.error(
        `Coordinates not found for selected location: ${selectedLocation.address}`
      );
      return;
    }
    if (popup.current) {
      popup.current.remove();
    }
    popup.current = new maptilersdk.Popup({ offset: 25 })
      .setLngLat([coords.lon, coords.lat])
      .setHTML(
        `<strong>${selectedLocation.name}</strong><br>${selectedLocation.address}<br><i>'${selectedLocation.notes}, ${selectedLocation.jRating}/10'</i>`
      )
      .addTo(map.current!);
    map.current.flyTo({
      center: [coords.lon, coords.lat],
      zoom: 16,
      speed: 1.2,
    });
  };

  useEffect(() => {
    initializeMap();
  }, [location, zoom]);

  useEffect(() => {
    updateMarkers();
  }, [restaurants]);

  useEffect(() => {
    updatePopup();
  }, [selectedLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute h-full w-full" />
    </div>
  );
}

import React, { useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Restaurant } from "@/content/restaurants";

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
  const location = { lng: -4.2583, lat: 55.8617 };
  const zoom = 14;

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;

  // Helper function to fetch latitude and longitude from an address
  const fetchCoordinates = async (address: string) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&country=gb&limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
      );
      if (!response.ok)
        throw new Error(`Failed to fetch: ${response.statusText}`);
      const data = await response.json();
      if (data.length === 0) return null; // No results
      return { lat: parseFloat(data.features[0].geometry.coordinates[1]), lon: parseFloat(data.features[0].geometry.coordinates[0]) };
    } catch (error) {
      console.error(
        `Error fetching coordinates for address "${address}":`,
        error
      );
      return null;
    }
  };

  useEffect(() => {
    if (!map.current) {
      map.current = new maptilersdk.Map({
        container: mapContainer.current as HTMLElement, // Non-null assertion
        style: maptilersdk.MapStyle.STREETS,
        center: [location.lng, location.lat],
        zoom: zoom,
        maxZoom: 16,
        minZoom: 10,
      });
    }
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Remove existing markers
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    (async () => {
      const markerPromises = restaurants.map(async (restaurant) => {
        const coords = await fetchCoordinates(restaurant.address);
        if (!coords) return null; // Skip marker if coordinates not found

        const marker = new maptilersdk.Marker({ color: "#FF0000" })
          .setLngLat([coords.lon, coords.lat])
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

      // Wait for all markers to resolve and filter out null values
      markers.current = (await Promise.all(markerPromises)).filter(
        (marker): marker is maptilersdk.Marker => marker !== null
      );
    })();
  }, [restaurants, setSelectedLocation]);

  useEffect(() => {
    if (!selectedLocation || !map.current) return;

    (async () => {
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
          `<strong>${selectedLocation.name}</strong><br>${selectedLocation.address}`
        )
        .addTo(map.current!);

      map.current!.flyTo({
        center: [coords.lon, coords.lat],
        zoom: 14,
        speed: 1.2,
      });
    })();
  }, [selectedLocation]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute h-full w-full" />
    </div>
  );
}

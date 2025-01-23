export const fetchCoordinates = async (address: string) => {
  if (!address || address.trim() === "") {
    console.warn("Skipping API call: Address is empty.");
    return null;
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&country=gb&limit=1&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    if (!response.ok)
      throw new Error(`Failed to fetch: ${response.statusText}`);

    const data = await response.json();
    if (data.features.length === 0) return null; // No results

    return {
      lat: parseFloat(data.features[0].geometry.coordinates[1]),
      lon: parseFloat(data.features[0].geometry.coordinates[0]),
    };
  } catch (error) {
    console.error(
      `Error fetching coordinates for address "${address}":`,
      error
    );
    return null;
  }
};

export const getVeganIcon = (rating: number): string => {
  let veganIconString = "/vegan-icon-default.svg";
  if (rating >= 6) {
    veganIconString = "/vegan-icon-green.svg";
  } else if (rating < 6 && rating > 3) {
    veganIconString = "/vegan-icon-yellow.svg";
  } else if (rating <= 3) {
    veganIconString = "/vegan-icon-red.svg";
  }
  return veganIconString;
};

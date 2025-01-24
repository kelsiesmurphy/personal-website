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

export const getVeganIconColour = (
  rating: number
): { main: string; border: string } => {
  let veganIconString = { main: "#e5e7eb", border: "#9ca3af" };
  if (rating >= 6) {
    veganIconString = { main: "#22c55e", border: "#16a34a" };
  } else if (rating < 6 && rating > 3) {
    veganIconString = { main: "#fcd34d", border: "#fbbf24" };
  } else if (rating <= 3) {
    veganIconString = { main: "#f87171", border: "#ef4444" };
  }
  return veganIconString;
};

export const getVeganIcon = (rating: number, cuisineType: string): string => {
  const baseColor: { main: string; border: string } =
    getVeganIconColour(rating);
  const emojiMap: Record<string, string> = {
    Bakery: "🥐",
    Café: "☕️",
    Thai: "🍜",
    Japanese: "🍣",
    Bar: "🍷",
    Italian: "🍝",
    Chinese: "🥡",
    Indian: "🥘",
    Korean: "🍜",
    Dessert: "🍰",
    Mexican: "🌮",
  };

  const emoji = emojiMap[cuisineType] || "🌱";

  const svg = `
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Original Circle Path -->
      <path d="M19.978 0.219238C12.3718 0.219238 6.18451 6.40657 6.18451 14.0127C6.18451 16.1286 6.65087 18.1582 7.57866 20.0594C8.85438 22.6195 12.5878 28.9314 16.5407 35.6147L18.4654 38.8719C18.7813 39.4061 19.3562 39.7355 19.978 39.7355C20.5998 39.7355 21.1748 39.4073 21.4906 38.8719L23.414 35.6172C27.3399 28.9808 31.0498 22.7083 32.3502 20.1149C32.3625 20.0927 32.3749 20.0693 32.3848 20.0471C33.3051 18.1582 33.7703 16.1274 33.7703 14.014C33.7715 6.40781 27.5829 0.219238 19.978 0.219238Z" fill="${baseColor.main}"/>
      
      <!-- Border Path -->
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4017 35.106L19.3262 38.3629C19.4627 38.5938 19.711 38.7355 19.978 38.7355C20.2461 38.7355 20.4934 38.5942 20.6293 38.3638L22.5531 35.1084C26.4923 28.4495 30.1761 22.2198 31.4563 19.6667L31.4658 19.6478L31.4761 19.6293V19.6293L31.4781 19.6249L31.4858 19.6091C32.339 17.858 32.7703 15.9771 32.7703 14.014C32.7714 6.96019 27.0306 1.21924 19.978 1.21924C12.9241 1.21924 7.18451 6.95886 7.18451 14.0127C7.18451 15.9761 7.61598 17.8543 8.47559 19.6172C9.73232 22.138 13.4367 28.4024 17.4017 35.106ZM7.57866 20.0594C6.65087 18.1582 6.18451 16.1286 6.18451 14.0127C6.18451 6.40657 12.3718 0.219238 19.978 0.219238C27.5829 0.219238 33.7715 6.40781 33.7703 14.014C33.7703 16.1274 33.3051 18.1582 32.3848 20.0471C32.3749 20.0693 32.3625 20.0927 32.3502 20.1149C31.0498 22.7083 27.3399 28.9808 23.414 35.6172L21.4906 38.8719C21.1748 39.4073 20.5998 39.7355 19.978 39.7355C19.3562 39.7355 18.7813 39.4061 18.4654 38.8719L16.5387 35.6113C12.5865 28.9293 8.85416 22.619 7.57866 20.0594Z" fill="${baseColor.border}"/>

      <circle cx="20" cy="14" r="10" fill="white"/>
      
      <!-- Emoji Overlay -->
      <text x="20.5" y="19" fill="black" font-size="12" text-anchor="middle">${emoji}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

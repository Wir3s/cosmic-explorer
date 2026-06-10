export async function getLocationDescription(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      {
        headers: {
          "User-Agent": "cosmic-explorer/1.0",
        },
      }
    );

    if (!response.ok) {
      return getDefaultLocationDescription(latitude, longitude);
    }

    const data = await response.json();
    const address = data.address || {};

    // Prioritize specific location names
    const locationName =
      address.country_code === "us"
        ? address.state || address.country
        : address.region || address.country || "Unknown Location";

    // Add directional context if available
    if (address.state_district) {
      return `Currently over ${address.state_district}, ${locationName}`;
    } else if (address.state || address.region) {
      return `Currently over ${locationName}`;
    } else {
      return `Currently over ${address.country || "Open Ocean"}`;
    }
  } catch (error) {
    return getDefaultLocationDescription(latitude, longitude);
  }
}

function getDefaultLocationDescription(latitude: number, longitude: number): string {
  // Fallback descriptions based on hemisphere
  const latDirection = latitude >= 0 ? "Northern" : "Southern";
  const lonDirection = longitude >= 0 ? "Eastern" : "Western";
  return `Currently over the ${latDirection} ${lonDirection} Hemisphere`;
}

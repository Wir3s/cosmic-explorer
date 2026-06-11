type GeoNamesSubdivisionResponse = {
  countryName?: string;
  adminName1?: string;
  status?: {
    message?: string;
  };
};

type GeoNamesOceanResponse = {
  ocean?: {
    name?: string;
  };
  status?: {
    message?: string;
  };
};

export async function getLocationDescription(
  latitude: number,
  longitude: number
): Promise<string> {
  const username = process.env.GEONAMES_USERNAME;

  if (!username) {
    return getDefaultLocationDescription(latitude, longitude);
  }

  const params = new URLSearchParams({
    lat: latitude.toFixed(2),
    lng: longitude.toFixed(2),
    username,
  });

  try {
    const subdivisionResponse = await fetch(
      `https://secure.geonames.org/countrySubdivisionJSON?${params.toString()}`,
      { cache: "no-store" }
    );

    if (subdivisionResponse.ok) {
      const subdivision =
        (await subdivisionResponse.json()) as GeoNamesSubdivisionResponse;

      if (subdivision.adminName1 && subdivision.countryName) {
        return `Currently over ${subdivision.adminName1}, ${subdivision.countryName}`;
      }

      if (subdivision.countryName) {
        return `Currently over ${subdivision.countryName}`;
      }
    }

    const oceanResponse = await fetch(
      `https://secure.geonames.org/oceanJSON?${params.toString()}`,
      { cache: "no-store" }
    );

    if (oceanResponse.ok) {
      const ocean = (await oceanResponse.json()) as GeoNamesOceanResponse;

      if (ocean.ocean?.name) {
        return `Currently over the ${ocean.ocean.name}`;
      }
    }

    return getDefaultLocationDescription(latitude, longitude);
  } catch (error) {
    console.error("[ISS location] Failed to describe location:", error);
    return getDefaultLocationDescription(latitude, longitude);
  }
}

function getDefaultLocationDescription(
  latitude: number,
  longitude: number
): string {
  const absLat = Math.abs(latitude);

  if (absLat >= 66.5) {
    return latitude >= 0
      ? "Currently over the Arctic region"
      : "Currently over Antarctica or the Southern Ocean";
  }

  if (latitude >= 0 && longitude >= -80 && longitude <= 20) {
    return "Currently over the North Atlantic region";
  }

  if (latitude < 0 && longitude >= -70 && longitude <= 20) {
    return "Currently over the South Atlantic region";
  }

  if (
    latitude >= 0 &&
    ((longitude >= 120 && longitude <= 180) ||
      (longitude >= -180 && longitude <= -70))
  ) {
    return "Currently over the North Pacific region";
  }

  if (
    latitude < 0 &&
    ((longitude >= 120 && longitude <= 180) ||
      (longitude >= -180 && longitude <= -70))
  ) {
    return "Currently over the South Pacific region";
  }

  if (latitude < 30 && latitude > -60 && longitude > 20 && longitude < 120) {
    return "Currently over the Indian Ocean region";
  }

  if (latitude >= 0 && longitude > 20 && longitude <= 60) {
    return "Currently over Europe, North Africa, or western Asia";
  }

  if (latitude < 0 && longitude > 20 && longitude <= 60) {
    return "Currently over Africa or the western Indian Ocean";
  }

  if (latitude >= 0 && longitude > 60 && longitude < 120) {
    return "Currently over central or eastern Asia";
  }

  if (latitude < 0 && longitude > 60 && longitude < 150) {
    return "Currently over Australia, Indonesia, or the surrounding ocean";
  }

  return latitude >= 0
    ? "Currently over the Northern Hemisphere"
    : "Currently over the Southern Hemisphere";
}

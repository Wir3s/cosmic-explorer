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

  const roundedLatitude = latitude.toFixed(2);
  const roundedLongitude = longitude.toFixed(2);

  const params = new URLSearchParams({
    lat: roundedLatitude,
    lng: roundedLongitude,
    username,
  });

  try {
    const subdivisionResponse = await fetch(
      `https://secure.geonames.org/countrySubdivisionJSON?${params.toString()}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (subdivisionResponse.ok) {
      const subdivision: GeoNamesSubdivisionResponse =
        await subdivisionResponse.json();

      if (subdivision.adminName1 && subdivision.countryName) {
        return `Currently over ${subdivision.adminName1}, ${subdivision.countryName}`;
      }

      if (subdivision.countryName) {
        return `Currently over ${subdivision.countryName}`;
      }
    }

    const oceanResponse = await fetch(
      `https://secure.geonames.org/oceanJSON?${params.toString()}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (oceanResponse.ok) {
      const ocean: GeoNamesOceanResponse = await oceanResponse.json();

      if (ocean.ocean?.name) {
        return `Currently over the ${ocean.ocean.name}`;
      }
    }

    return getDefaultLocationDescription(latitude, longitude);
  } catch {
    return getDefaultLocationDescription(latitude, longitude);
  }
}

function getDefaultLocationDescription(
  latitude: number,
  longitude: number
): string {
  const latDirection = latitude >= 0 ? "Northern" : "Southern";
  const lonDirection = longitude >= 0 ? "Eastern" : "Western";

  return `Currently over the ${latDirection} ${lonDirection} Hemisphere`;
}

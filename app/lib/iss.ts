export type IssPosition = {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: "daylight" | "eclipsed";
  timestamp: number;
};

export async function fetchIssPosition(): Promise<IssPosition> {
  const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544", {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(
      `Failed to fetch ISS position. Status: ${res.status}. Response: ${errorText}`
    );
  }

  return res.json();
}
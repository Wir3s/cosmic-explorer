export type ApodData = {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  title: string;
  url: string;
  copyright?: string;
};

export async function fetchApod(): Promise<ApodData> {
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    throw new Error("NASA_API_KEY is not set");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
      {
        cache: "no-store",
        signal: controller.signal,
      }
    );

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(
        `Failed to fetch NASA image of the day. Status: ${res.status}. Response: ${errorText}`
      );
    }

    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}
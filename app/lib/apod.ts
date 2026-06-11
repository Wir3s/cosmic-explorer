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
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
const res = await fetch(
  `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`,
  {
    next: {
      revalidate: 60 * 60 * 24,
    },
    signal: controller.signal,
  }
);

    return res.json();
  } finally {
    clearTimeout(timeout);
  }
}
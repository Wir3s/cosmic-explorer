type ApodData = {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  title: string;
  url: string;
  copyright?: string;
};

export async function GET() {
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "NASA_API_KEY is not set" },
      { status: 500 }
    );
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
      return Response.json(
        {
          error: `Failed to fetch NASA image of the day. Status: ${res.status}`,
        },
        { status: res.status }
      );
    }

    const data = (await res.json()) as ApodData;
    return Response.json(data);
  } catch (error) {
    console.error("[APOD] Request errored or timed out:", error);
    return Response.json(
      { error: "Failed to fetch APOD data" },
      { status: 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}

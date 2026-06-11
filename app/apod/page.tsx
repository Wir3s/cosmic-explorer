import Link from "next/link";

type ApodData = {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  title: string;
  url: string;
  copyright?: string;
};

async function getApod(): Promise<ApodData | null> {
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    console.error("[APOD] NASA_API_KEY is not set");
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

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

    clearTimeout(timeout);

    if (!res.ok) {
      const errorText = await res.text();

      console.error("[APOD] Fetch failed:", {
        status: res.status,
        response: errorText,
      });

      return null;
    }

    return res.json();
  } catch (error) {
    clearTimeout(timeout);
    console.error("[APOD] Request errored or timed out:", error);
    return null;
  }
}

export default async function ApodPage() {
  const apod = await getApod();
  if (!apod) {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-cyan-300 transition hover:text-cyan-200"
        >
          ← Back to Cosmic Explorer
        </Link>

        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
          NASA Image of the Day
        </p>

        <div className="rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-6">
          <h1 className="text-3xl font-bold">
            NASA’s image service is taking a space nap.
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            The Astronomy Picture of the Day could not be loaded right now.
            This usually means NASA’s API is slow or temporarily unavailable.
          </p>
        </div>
      </section>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-5xl">
        <Link
  href="/"
  className="mb-8 inline-block text-sm text-cyan-300 transition hover:text-cyan-200"
>
  ← Back to Cosmic Explorer
</Link>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
          NASA Image of the Day
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {apod.title}
        </h1>

        <p className="mt-3 text-slate-400">{apod.date}</p>

<div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl">
  {apod.media_type === "image" ? (
    <img
      src={apod.hdurl ?? apod.url}
      alt={apod.title}
      className="max-h-[75vh] w-full object-contain"
    />
  ) : (
    <iframe
      src={apod.url}
      title={apod.title}
      className="aspect-video w-full"
      allowFullScreen
    />
  )}
</div>

        {apod.copyright && (
          <p className="mt-3 text-sm text-slate-500">
            Image credit: {apod.copyright}
          </p>
        )}

<div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
  <p className="max-w-3xl text-lg leading-8 text-slate-300">
    {apod.explanation}
  </p>
</div>
      </section>
    </main>
  );
}
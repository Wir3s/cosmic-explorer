export const dynamic = "force-dynamic";
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

async function getApod(): Promise<ApodData> {
  const res = await fetch("/api/apod", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch APOD data");
  }

  return res.json();
}

export default async function ApodPage() {
  const apod = await getApod();

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
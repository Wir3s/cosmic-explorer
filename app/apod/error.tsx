"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
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

          <button
            onClick={reset}
            className="mt-6 rounded-full bg-cyan-300 px-5 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Try again
          </button>
        </div>
      </section>
    </main>
  );
}
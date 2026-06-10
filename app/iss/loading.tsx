export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
          ISS Live
        </p>

        <div className="mt-8 animate-pulse">
          <div className="h-10 max-w-2xl rounded bg-white/10" />
          <div className="mt-4 h-5 max-w-xs rounded bg-white/10" />
          <div className="mt-8 h-64 rounded-2xl bg-white/10" />
        </div>
      </section>
    </main>
  );
}
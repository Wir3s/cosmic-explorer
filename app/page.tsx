import Link from "next/link";

const features = [
  {
    emoji: "🌌",
    title: "NASA Image of the Day",
    description: "Start with a daily featured image from NASA’s astronomy archive.",
    href: "/apod",
  },
  {
    emoji: "🛰️",
    title: "ISS Live",
    description: "Track the International Space Station as it moves above Earth.",
  },
  {
    emoji: "🔭",
    title: "James Webb",
    description: "Explore deep-space images and discoveries from Webb.",
  },
  {
    emoji: "🪐",
    title: "NASA Images",
    description: "Search planets, missions, galaxies, and cosmic oddities.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300">
          Cosmic Explorer
        </p>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl">
          Explore the universe through live data and imagery.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          A space discovery dashboard featuring NASA imagery, the ISS, James
          Webb, and whatever strange beautiful thing the cosmos serves up next.
        </p>

<div className="mt-12 grid gap-6 sm:grid-cols-2">
  {features.map((feature) => {
    const cardContent = (
      <>
        <div className="text-4xl">{feature.emoji}</div>
        <h2 className="mt-4 text-2xl font-semibold">{feature.title}</h2>
        <p className="mt-3 text-slate-300">{feature.description}</p>
      </>
    );

    return feature.href ? (
      <Link
        key={feature.title}
        href={feature.href}
        className="rounded-2xl border border-cyan-300/30 bg-white/5 p-6 shadow-lg transition hover:border-cyan-300/70 hover:bg-white/10"
      >
        {cardContent}
      </Link>
    ) : (
      <article
        key={feature.title}
        className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg opacity-75"
      >
        {cardContent}
      </article>
    );
  })}
</div>
      </section>
    </main>
  );
}
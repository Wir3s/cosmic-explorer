import Link from "next/link";
import { Suspense } from "react";
import { fetchApod } from "@/app/lib/apod";
import { fetchIssPosition } from "@/app/lib/iss";
import { getLocationDescription } from "@/app/lib/geolocation";

function FeatureCard({
  emoji,
  title,
  description,
  href,
  isLive,
  isLoading,
}: {
  emoji: string;
  title: string;
  description: string;
  href?: string;
  isLive?: boolean;
  isLoading?: boolean;
}) {
  const cardContent = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="text-4xl">{emoji}</div>

        {isLive && (
          <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            {isLoading ? "Loading" : "Live"}
          </span>
        )}
      </div>

      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>

      <p className={isLoading ? "mt-3 text-slate-500" : "mt-3 text-slate-300"}>
        {description}
      </p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="rounded-2xl border border-cyan-300/30 bg-white/5 p-6 shadow-lg transition hover:border-cyan-300/70 hover:bg-white/10"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg opacity-75">
      {cardContent}
    </article>
  );
}

async function ApodPreviewCard() {
  try {
    const apod = await fetchApod();

    return (
      <FeatureCard
        emoji="🌌"
        title="NASA Image of the Day"
        description={`Today: ${apod.title}`}
        href="/apod"
        isLive
      />
    );
  } catch (error) {
    console.error("[Homepage] Failed to load APOD preview:", error);

    return (
      <FeatureCard
        emoji="🌌"
        title="NASA Image of the Day"
        description="Explore today’s astronomy image."
        href="/apod"
        isLive
      />
    );
  }
}

async function IssPreviewCard() {
  try {
    const iss = await fetchIssPosition();
    const location = await getLocationDescription(iss.latitude, iss.longitude);

    return (
      <FeatureCard
        emoji="🛰️"
        title="ISS Live"
        description={location}
        href="/iss"
        isLive
      />
    );
  } catch (error) {
    console.error("[Homepage] Failed to load ISS preview:", error);

    return (
      <FeatureCard
        emoji="🛰️"
        title="ISS Live"
        description="Track the station above Earth."
        href="/iss"
        isLive
      />
    );
  }
}

function ApodPreviewSkeleton() {
  return (
    <FeatureCard
      emoji="🌌"
      title="NASA Image of the Day"
      description="Checking today’s astronomy image..."
      href="/apod"
      isLive
      isLoading
    />
  );
}

function IssPreviewSkeleton() {
  return (
    <FeatureCard
      emoji="🛰️"
      title="ISS Live"
      description="Finding the station’s current position..."
      href="/iss"
      isLive
      isLoading
    />
  );
}

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
          <Suspense fallback={<ApodPreviewSkeleton />}>
            <ApodPreviewCard />
          </Suspense>

          <Suspense fallback={<IssPreviewSkeleton />}>
            <IssPreviewCard />
          </Suspense>

          <FeatureCard
            emoji="🔭"
            title="James Webb"
            description="Explore deep-space images and discoveries from Webb."
          />

          <FeatureCard
            emoji="🪐"
            title="NASA Images"
            description="Search planets, missions, galaxies, and cosmic oddities."
          />
        </div>
      </section>
    </main>
  );
}
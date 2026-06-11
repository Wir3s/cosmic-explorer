import Link from "next/link";
import { fetchIssPosition } from "@/app/lib/iss";
import { getLocationDescription } from "@/app/lib/geolocation";

export const dynamic = "force-dynamic";

type IssPosition = {
  name: string;
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  visibility: "daylight" | "eclipsed";
  timestamp: number;
};

async function getIssPosition(): Promise<IssPosition> {
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

function formatCoordinate(value: number, directionA: string, directionB: string) {
  const direction = value >= 0 ? directionA : directionB;
  return `${Math.abs(value).toFixed(4)}° ${direction}`;
}

function formatTime(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default async function IssPage() {
const iss = await fetchIssPosition();

const locationDescription = await getLocationDescription(
  iss.latitude,
  iss.longitude
);

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
          ISS Live
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Where is the International Space Station?
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          The ISS is moving around Earth at thousands of miles per hour. Here is
          its latest reported position.
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Current Position
          </p>

          <div className="mt-4 rounded-lg bg-cyan-500/10 p-4">
            <p className="text-lg font-semibold text-cyan-300">
              {locationDescription}
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-slate-400">Latitude</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCoordinate(iss.latitude, "N", "S")}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Longitude</p>
              <p className="mt-2 text-2xl font-semibold">
                {formatCoordinate(iss.longitude, "E", "W")}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Altitude</p>
              <p className="mt-2 text-2xl font-semibold">
                {iss.altitude.toFixed(1)} km
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Velocity</p>
              <p className="mt-2 text-2xl font-semibold">
                {iss.velocity.toFixed(0)} km/h
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-900/70 p-4">
            <p className="text-slate-300">
              Last updated at{" "}
              <span className="font-semibold text-white">
                {formatTime(iss.timestamp)}
              </span>
              . The station is currently in{" "}
              <span className="font-semibold text-white">{iss.visibility}</span>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
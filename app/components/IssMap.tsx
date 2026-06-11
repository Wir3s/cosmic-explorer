type IssMapProps = {
  latitude: number;
  longitude: number;
  locationDescription: string;
};

function getMarkerPosition(latitude: number, longitude: number) {
  const x = ((longitude + 180) / 360) * 100;
  const y = ((90 - latitude) / 180) * 100;

  return { x, y };
}

export function IssMap({
  latitude,
  longitude,
  locationDescription,
}: IssMapProps) {
  const { x, y } = getMarkerPosition(latitude, longitude);

  const latitudeLines = [-60, -30, 0, 30, 60];
  const longitudeLines = [-120, -60, 0, 60, 120];

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white">Orbital Map</h2>
        <p className="text-sm text-slate-400">Equirectangular projection</p>
      </div>

      <div
        className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
        aria-label={`ISS map position: ${locationDescription}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_60%)]" />

        <svg
          viewBox="0 0 360 180"
          className="absolute inset-0 h-full w-full"
          role="img"
          aria-hidden="true"
        >
          <rect width="360" height="180" fill="rgba(15, 23, 42, 0.9)" />

          {latitudeLines.map((lat) => {
            const y = ((90 - lat) / 180) * 180;

            return (
              <line
                key={`lat-${lat}`}
                x1="0"
                y1={y}
                x2="360"
                y2={y}
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1"
              />
            );
          })}

          {longitudeLines.map((lng) => {
            const x = ((lng + 180) / 360) * 360;

            return (
              <line
                key={`lng-${lng}`}
                x1={x}
                y1="0"
                x2={x}
                y2="180"
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1"
              />
            );
          })}

          <line
            x1="0"
            y1="90"
            x2="360"
            y2="90"
            stroke="rgba(34, 211, 238, 0.35)"
            strokeWidth="1.5"
          />

          <text
            x="12"
            y="24"
            fill="rgba(226, 232, 240, 0.45)"
            fontSize="10"
          >
            180° W
          </text>

          <text
            x="300"
            y="24"
            fill="rgba(226, 232, 240, 0.45)"
            fontSize="10"
          >
            180° E
          </text>

          <text
            x="12"
            y="88"
            fill="rgba(34, 211, 238, 0.55)"
            fontSize="10"
          >
            Equator
          </text>
        </svg>

        <div
          className="absolute"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className="absolute -inset-4 animate-ping rounded-full bg-cyan-300/30" />
            <div className="relative rounded-full bg-cyan-300 px-3 py-1 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-950/40">
              ISS
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur">
          <p className="text-sm font-semibold text-cyan-300">
            {locationDescription}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Lat {latitude.toFixed(2)}°, Lon {longitude.toFixed(2)}°
          </p>
        </div>
      </div>
    </div>
  );
}
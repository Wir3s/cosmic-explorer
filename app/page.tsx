import Image from "next/image";

export default function Home() {
  return (
   
         <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">
        Cosmic Explorer
      </h1>

      <p className="mb-8 text-lg">
        Explore the universe through live data and imagery.
      </p>

      <div className="space-y-4">
        <div>🛰 ISS Live</div>
        <div>🔭 James Webb</div>
        <div>🌌 NASA Images</div>
        <div>☄️ Asteroids</div>
      </div>
    </main>
  );
}

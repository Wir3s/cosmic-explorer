import { fetchApod } from "@/app/lib/apod";

export const revalidate = 60 * 60 * 24;

export async function GET() {
  try {
    const data = await fetchApod();

    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("[APOD API] Request failed:", error);

    return Response.json(
      { error: "Failed to fetch APOD data" },
      { status: 500 }
    );
  }
}
import { fetchApod } from "@/app/lib/apod";

export async function GET() {
  try {
    const data = await fetchApod();
    return Response.json(data);
  } catch (error) {
    console.error("[APOD API] Request failed:", error);

    return Response.json(
      { error: "Failed to fetch APOD data" },
      { status: 500 }
    );
  }
}
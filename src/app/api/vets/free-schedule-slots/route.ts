import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vetId = searchParams.get("vetId");

    if (!vetId) {
      return NextResponse.json(
        { message: "Missing vetId" },
        { status: 400 }
      );
    }

    console.log("Fetching AWS free schedule slots:", vetId);

    const res = await fetch(`${process.env.API_URL}/v1/vets/${vetId}/free-schedule-slots`);

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { message: "Failed to fetch schedule slots", details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Fetch free schedule slots error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
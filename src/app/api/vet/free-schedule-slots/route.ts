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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/vets/${vetId}/free-schedule-slots`,
      { headers: { "Content-Type": "application/json" } }
    );

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
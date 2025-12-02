import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vetId = searchParams.get("vetId");
    const date = searchParams.get("date");

    if (!vetId || !date) {
      return NextResponse.json(
        { message: "Missing vetId or date param" },
        { status: 400 }
      );
    }

    console.log("Fetching AWS schedule slots:", vetId, date);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/vets/${vetId}/schedule-slots?date=${date}`,
      { headers: { "Content-Type": "application/json" } }
    );

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Fetch schedule slots error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
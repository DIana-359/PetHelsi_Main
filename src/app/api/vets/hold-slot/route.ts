import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vetId = searchParams.get("vetId");
    const slotId = searchParams.get("slotId");

    if (!vetId || !slotId) {
      return NextResponse.json(
        { message: "Missing vetId or slotId parameter" },
        { status: 400 }
      );
    }

    const token = (await cookies()).get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(
      `${process.env.API_URL}/v1/owners/vets/${vetId}/schedule-slots/${slotId}/hold`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Hold slot failed" }));
      return NextResponse.json({ message: errorData.message || "Hold slot failed" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Hold slot API error:", err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

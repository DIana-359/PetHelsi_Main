import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ vetId: string }> }) {
  const { vetId } = await params;

  try {
    const res = await fetch(
      `${process.env.API_URL}/v1/vets/${vetId}`,
      {
        credentials: "include",
      }
    );

    const text = await res.text().catch(() => "<empty>");

    if (!res.ok) {
      return NextResponse.json(
        { error: text },
        { status: res.status }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

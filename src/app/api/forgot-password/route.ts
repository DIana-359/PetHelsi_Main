import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const res = await fetch(`${process.env.API_URL}/v1/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    return new NextResponse(null, { status: res.status });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}

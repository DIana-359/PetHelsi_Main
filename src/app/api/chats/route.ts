import { getServerToken } from "@/lib/getServerToken";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getServerToken();

  if (!token) {
    return NextResponse.json(
      { error: "No auth token" },
      { status: 401 }
    );
  }

  const res = await fetch(
    `${process.env.API_URL}/v1/chats/my`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

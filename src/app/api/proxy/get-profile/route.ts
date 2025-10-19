import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (!token) {
    return NextResponse.json({ error: "No auth token" }, { status: 401 });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/owners/profile`,
    {
      headers: {
        Accept: "application/json",
        Cookie: `auth-token=${token}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}

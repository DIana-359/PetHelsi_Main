import { NextResponse } from "next/server";
import { getServerToken } from "@/lib/getServerToken";

export async function GET() {
  const token = await getServerToken();

  if (!token) {
    return NextResponse.json({ error: "No token" }, { status: 401 });
  }

  return NextResponse.json({ token });
}

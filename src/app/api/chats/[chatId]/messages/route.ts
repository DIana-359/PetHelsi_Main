import { getServerToken } from "@/lib/getServerToken";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ chatId: string }> }
) {
  const { searchParams } = new URL(request.url);
  const { chatId } = await params;

  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "50";

  const token = await getServerToken();

  if (!token) {
    return NextResponse.json(
      { error: "No auth token" },
      { status: 401 }
    );
  }

  const res = await fetch(
    `${process.env.API_URL}/v1/chats/history?chatId=${chatId}&page=${page}&size=${size}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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
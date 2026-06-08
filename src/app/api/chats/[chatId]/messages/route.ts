import { NextResponse } from "next/server";
import { withAuth, backendFetch } from "@/lib/proxyHandler";

export const GET = withAuth<{ chatId: string }>(async ({ token, req, params }) => {
  const { chatId } = params;
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "0";
  const size = searchParams.get("size") ?? "50";

  const res = await backendFetch(
    `/v1/chats/history?chatId=${chatId}&page=${page}&size=${size}`,
    token,
  );

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
});

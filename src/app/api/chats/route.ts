import { NextResponse } from "next/server";
import { withAuth, backendFetch } from "@/lib/proxyHandler";

export const GET = withAuth(async ({ token }) => {
  const res = await backendFetch(`/v1/chats/my`, token, { cache: "no-store" });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
});

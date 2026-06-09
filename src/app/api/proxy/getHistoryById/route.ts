import { NextResponse } from "next/server";
import { withAuth, backendFetch } from "@/lib/proxyHandler";

export const GET = withAuth(async ({ req, token }) => {
  const id = new URL(req.url).searchParams.get("id");

  const res = await backendFetch(`/v1/owners/history/${id}`, token);

  if (!res.ok) {
    const details = await res.text();
    return NextResponse.json(
      { error: `Failed to fetch history. Status: ${res.status}`, details },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
});

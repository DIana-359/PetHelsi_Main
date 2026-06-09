import { NextResponse } from "next/server";
import { withAuth, backendFetch } from "@/lib/proxyHandler";

export const PATCH = withAuth(async ({ req, token }) => {
  const id = new URL(req.url).searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const body = await req.json();

  const res = await backendFetch(`/v1/owners/history/${id}`, token, {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const details = await res.text();
    return NextResponse.json(
      { error: `Failed to update complaint. Status: ${res.status}`, details },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
});

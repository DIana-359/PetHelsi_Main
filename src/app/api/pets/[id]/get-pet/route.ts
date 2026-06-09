import { NextResponse } from "next/server";
import { withAuth, backendFetch } from "@/lib/proxyHandler";

export const GET = withAuth<{ id: string }>(async ({ token, params }) => {
  const { id: petId } = params;
  const res = await backendFetch(`/v1/owners/pets/${petId}`, token);

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch pet" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
});

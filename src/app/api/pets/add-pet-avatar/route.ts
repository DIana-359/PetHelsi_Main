import { NextResponse } from "next/server";
import { withAuth, backendFetch, forwardJson } from "@/lib/proxyHandler";

export const POST = withAuth(async ({ token, req }) => {
  const petId = req.nextUrl.searchParams.get("petId");
  if (!petId) {
    return NextResponse.json(
      { message: "petId query parameter is required" },
      { status: 400 },
    );
  }

  const formData = await req.formData();
  const res = await backendFetch(`/v1/owners/pets/${petId}/avatars`, token, {
    method: "POST",
    body: formData,
  });
  return forwardJson(res);
});

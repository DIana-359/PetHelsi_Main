import { NextResponse } from "next/server";
import { withAuth, backendFetch, forwardJson } from "@/lib/proxyHandler";

export const DELETE = withAuth(async ({ token }) => {
  const res = await backendFetch(`/v1/owners`, token, { method: "DELETE" });

  if (res.status === 204) {
    const response = new NextResponse(null, { status: 204 });
    response.cookies.set("auth-token", "", { path: "/", maxAge: 0 });
    return response;
  }

  return forwardJson(res);
});

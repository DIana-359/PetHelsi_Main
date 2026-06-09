import { withAuth, backendFetch, forwardJson } from "@/lib/proxyHandler";

export const GET = withAuth(async ({ token }) => {
  const res = await backendFetch(`/v1/owners/pets`, token);
  return forwardJson(res);
});

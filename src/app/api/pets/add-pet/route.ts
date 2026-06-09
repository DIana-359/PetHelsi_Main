import { withAuth, backendFetch, forwardJson } from "@/lib/proxyHandler";

export const POST = withAuth(async ({ token, req }) => {
  const body = await req.json();
  const res = await backendFetch(`/v1/owners/pets`, token, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return forwardJson(res);
});

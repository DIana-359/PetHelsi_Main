import { withAuth, backendFetch, forwardJson } from "@/lib/proxyHandler";

export const PUT = withAuth(async ({ token, req }) => {
  const body = await req.json();
  const res = await backendFetch(`/v1/owners/update-profile`, token, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return forwardJson(res);
});

import { withAuth, backendFetch, forwardJson } from "@/lib/proxyHandler";

export const PUT = withAuth<{ id: string }>(async ({ token, req, params }) => {
  const { id: petId } = params;
  const body = await req.json();
  const res = await backendFetch(`/v1/owners/pets/${petId}`, token, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return forwardJson(res);
});

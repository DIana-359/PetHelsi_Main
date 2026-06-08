import { withAuth, backendFetch, forwardJson } from "@/lib/proxyHandler";

export const DELETE = withAuth<{ id: string }>(async ({ token, params }) => {
  const { id: petId } = params;
  const res = await backendFetch(`/v1/owners/pets/${petId}`, token, {
    method: "DELETE",
  });
  return forwardJson(res);
});

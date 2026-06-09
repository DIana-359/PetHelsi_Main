import { withAuth, backendFetch, forwardJson } from "@/lib/proxyHandler";

export const POST = withAuth<{ id: string }>(async ({ token, req, params }) => {
  const { id } = params;
  const formData = await req.formData();
  const res = await backendFetch(`/v1/owners/pets/${id}/avatars`, token, {
    method: "POST",
    body: formData,
  });
  return forwardJson(res);
});

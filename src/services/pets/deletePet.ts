import { apiFetch } from "@/lib/apiFetch.client";

export async function deletePet(id: string) {
  const res = await apiFetch(`/api/pets/${id}/delete-pet`, {
    method: "DELETE",
  });

  if (res.status === 204) return { message: "Pet deleted" };

  return res.json();
}

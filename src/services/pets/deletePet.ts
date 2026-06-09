import { apiFetch } from "@/lib/apiFetch.client";
import { extractErrorMessage } from "@/lib/handleApiError";

export async function deletePet(id: string) {
  const res = await apiFetch(`/api/pets/${id}/delete-pet`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res, "Failed to delete pet"));
  }

  if (res.status === 204) return { message: "Pet deleted" };

  return res.json();
}

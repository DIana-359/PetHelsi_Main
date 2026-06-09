import { apiFetch } from "@/lib/apiFetch.client";
import { extractErrorMessage } from "@/lib/handleApiError";
import { Pet } from "@/types/pet";

export async function getPetById(id: string): Promise<Pet> {
  const res = await apiFetch(`/api/pets/${id}/get-pet`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res, "Failed to get pet"));
  }

  return (await res.json()) as Pet;
}

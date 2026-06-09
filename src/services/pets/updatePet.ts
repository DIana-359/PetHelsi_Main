import { apiFetch } from "@/lib/apiFetch.client";
import { extractErrorMessage } from "@/lib/handleApiError";
import { Pet } from "@/types/pet";

export async function updatePet(id: string, pet: Pet): Promise<Pet> {
  const res = await apiFetch(`/api/pets/${id}/update-pet`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res, "Failed to update pet"));
  }

  return (await res.json()) as Pet;
}

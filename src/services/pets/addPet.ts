import { Pet } from "@/types/pet";
import { apiFetch } from "@/lib/apiFetch.client";
import { extractErrorMessage } from "@/lib/handleApiError";

export async function addPet(pet: Pet): Promise<Pet> {
  const res = await apiFetch(`/api/pets/add-pet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to add pet: ${res.status} ${await extractErrorMessage(res, "")}`,
    );
  }

  return (await res.json()) as Pet;
}

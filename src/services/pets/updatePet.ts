import { apiFetch } from "@/lib/apiFetch.client";
import { Pet } from "@/types/pet";

export async function updatePet(id: string, pet: Pet): Promise<Pet> {
  const res = await apiFetch(`/api/pets/${id}/update-pet`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Failed to update pet: ${res.status} ${text}`);
  }

  return JSON.parse(text) as Pet;
}

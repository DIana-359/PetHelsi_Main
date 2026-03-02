import { Pet } from "@/types/pet";
import { apiFetch } from "@/lib/apiFetch.client";

export async function addPet(pet: Pet): Promise<Pet> {
  const res = await apiFetch(`/api/pets/add-pet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
    credentials: "include",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Failed to add pet: ${res.status} ${text}`);
  }

  return JSON.parse(text) as Pet;
}

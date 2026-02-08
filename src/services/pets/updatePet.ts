import { Pet } from "@/types/pet";

export async function updatePet(id: string, pet: Pet): Promise<Pet> {
  const res = await fetch(`/api/pets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
    credentials: "include",
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Failed to update pet: ${res.status} ${text}`);
  }

  return JSON.parse(text) as Pet;
}

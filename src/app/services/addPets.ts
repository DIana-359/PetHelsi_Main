import { Pet } from "../types/pet";

export async function addPets(pet: Pet): Promise<Pet> {
  const res = await fetch(`/api/ownerProfile/add-pet`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to add pet: ${res.status} ${text}`);
  }
  return (await res.json()) as Pet;
}

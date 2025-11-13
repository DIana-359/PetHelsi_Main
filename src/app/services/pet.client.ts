import type { Pet } from "@/app/types/pet";

export async function getPetsClient(): Promise<Pet[]> {
  const res = await fetch("/api/ownerProfile/get-pets", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return [];
  return res.json();
}
export async function addPetClient(pet: Pet): Promise<Pet> {
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

export async function deletePetClient(petId: string): Promise<void> {
  const res = await fetch(`/api/ownerProfile/delete-pet?id=${petId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (res.ok || res.status === 204) return;
  const text = await res.text().catch(() => "");
  throw new Error(`Failed to delete pet: ${res.status} ${text}`);
}

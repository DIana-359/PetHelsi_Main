import { apiFetch } from "@/lib/apiFetch.client";
import { petSchema } from "@/utils/schemas/pet.schemas";

export async function getPetById(id: string) {
  const res = await apiFetch(`/api/pets/${id}/get-pet`, {
    method: "GET",
  });

  if (!res.ok) throw new Error("Failed to get pet");

  return petSchema.parse(await res.json());
}

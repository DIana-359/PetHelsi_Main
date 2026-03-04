import { apiFetch } from "@/lib/apiFetch.client";
import { Pet } from "@/types/pet";

export async function getPets(): Promise<Pet[]> {
  const res = await apiFetch(`/api/pets/get-pets`, {
    method: "GET",
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to get pets");
  }

  if (res.status === 204) {
    return [];
  }

  const data = await res.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid pets response format");
  }

  return data;
}

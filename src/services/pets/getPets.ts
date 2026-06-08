import { apiFetch } from "@/lib/apiFetch.client";
import { extractErrorMessage } from "@/lib/handleApiError";
import { Pet } from "@/types/pet";

export async function getPets(): Promise<Pet[]> {
  const res = await apiFetch(`/api/pets/get-pets`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(await extractErrorMessage(res, "Failed to get pets"));
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

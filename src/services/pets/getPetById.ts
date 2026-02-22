import { apiFetch } from "@/lib/apiFetch.client";

export async function getPetById(id: string) {
  const res = await apiFetch(`/api/pets/${id}/get-pet`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to get pet");
  }

  return await res.json();
}

import { apiFetch } from "@/lib/apiFetch.client";

export async function deletePet(id: string) {
  try {
    const res = await apiFetch(`/api/pets/${id}/delete-pet`, {
      method: "DELETE",

      credentials: "include",
    });

    if (res.status === 204) {
      return { message: "Pet deleted" };
    }

    return await res.json();
  } catch (err) {
    console.error("deletePet error:", err);
    throw err;
  }
}

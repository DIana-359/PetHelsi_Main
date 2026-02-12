import { apiFetch } from "@/lib/apiFetch.client";
export async function getPets() {
  try {
    const res = await apiFetch(`/api/ownerProfile/get-pets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to get pet");
    }
    if (res.status === 204) {
      return { message: "Pets received" };
    }

    return await res.json();
  } catch (err) {
    console.error("getPet error:", err);
    throw err;
  }
}

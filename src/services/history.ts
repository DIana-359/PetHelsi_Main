import { apiFetch } from "@/lib/apiFetch.client";
export async function updateComplaint(id: string, complaint: string) {
  try {
    const res = await apiFetch(`/api/proxy/updateComplaint?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ complaint }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || "Помилка завантаження");
    }

    return res.json();
  } catch (error) {
    throw error;
  }
}

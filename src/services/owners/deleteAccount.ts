import { apiFetch } from "@/lib/apiFetch.client";
export async function deleteAccount() {
  try {
    const res = await apiFetch("/api/ownerProfile/delete-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to delete account");
    }

    if (res.status === 204) {
      return { message: "Account deleted" };
    }

    return await res.json();
  } catch (err) {
    console.error("deleteAccount error:", err);
    throw err;
  }
}

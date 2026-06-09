import { apiFetch } from "@/lib/apiFetch.client";
import { extractErrorMessage } from "@/lib/handleApiError";

export async function updatePetAvatar(id: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiFetch(`/api/pets/${id}/update-avatar`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(
      await extractErrorMessage(res, "Failed to update pet avatar"),
    );
  }

  const data = await res.json();
  return data.publicUrl;
}

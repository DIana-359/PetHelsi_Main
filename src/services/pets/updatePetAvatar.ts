import { apiFetch } from "@/lib/apiFetch.client";

export async function updatePetAvatar(id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await apiFetch(`/api/pets/${id}/update-avatar`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update pet avatar");
  }
  const data = await res.json();
  return data.publicUrl;
}

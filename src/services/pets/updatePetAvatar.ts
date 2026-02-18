export async function updatePetAvatar(id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/pets/${id}/avatar`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to update pet avatar");
  }
  const data = await res.json();
  return data.publicUrl;
}

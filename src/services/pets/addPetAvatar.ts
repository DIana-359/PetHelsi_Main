export interface AddPetAvatarResult {
  publicUrl?: string | null;
  error?: string;
}

export async function addPetAvatar(
  petId: string,
  file: File,
): Promise<AddPetAvatarResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`/api/ownerProfile/add-pet-avatar?petId=${petId}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const text = await res.text().catch(() => "<no response body>");

    if (!res.ok) {
      return { error: `Failed to add pet avatar: ${res.status} ${text}` };
    }

    const data = JSON.parse(text);
    return { publicUrl: data.publicUrl };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return { error: message };
  }
}

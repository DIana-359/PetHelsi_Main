import { Pet } from "@/app/types/pet";

interface AddPetResult {
  data: Pet | null;
  error?: string;
}

export async function addPet(pet: Pet): Promise<AddPetResult> {
  try {
    const res = await fetch(`/api/ownerProfile/add-pet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pet),
      credentials: "include",
    });

    const text = await res.text().catch(() => "<no response body>");

    if (!res.ok) {
      return { data: null, error: `Failed to add pet: ${res.status} ${text}` };
    }

    const data: Pet = JSON.parse(text);
    return { data };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unknown error occurred";
    return { data: null, error: message };
  }
}

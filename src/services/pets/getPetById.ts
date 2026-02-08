export async function getPetById(id: string) {
  const res = await fetch(`/api/pets/${id}`, {
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

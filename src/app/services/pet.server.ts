export async function getPetsServer() {
  try {
    const res = await fetch(`/api/ownerProfile/get-pets`, {
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
    if (res.status === 204) {
      return { message: "Pet geteted" };
    }

    return await res.json();
  } catch (err) {
    console.error("getPet error:", err);
    throw err;
  }
}

export async function deletePetServer(id: string, bearerToken?: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${base}/v1/owners/pets/${id}`, {
    method: "DELETE",
    headers: bearerToken
      ? {
          Authorization: `Bearer ${bearerToken}`,
        }
      : undefined,
    credentials: "include",
  });

  if (res.status === 204) return { ok: true };
  const text = await res.text().catch(() => "");
  return {
    ok: false,
    status: res.status,
    error: text || `Status ${res.status}`,
  };
}

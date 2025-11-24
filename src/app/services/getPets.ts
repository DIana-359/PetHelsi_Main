export async function getPets() {
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

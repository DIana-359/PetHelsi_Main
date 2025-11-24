export async function deletePets(id: string, bearerToken?: string) {
  try {
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

    if (res.status === 204) {
      return { message: "Account deleted" };
    }

    return await res.json();
  } catch (err) {
    console.error("deleteAccount error:", err);
    throw err;
  }
}

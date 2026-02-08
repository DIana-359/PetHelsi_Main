export async function deletePet(id: string) {
  try {
    const res = await fetch(`/api/pets/${id}`, {
      method: "DELETE",

      credentials: "include",
    });

    if (res.status === 204) {
      return { message: "Pet deleted" };
    }

    return await res.json();
  } catch (err) {
    console.error("deletePet error:", err);
    throw err;
  }
}

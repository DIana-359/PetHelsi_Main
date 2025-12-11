export const holdSlot = async (vetId: string, slotId: number) => {
  try {
    const res = await fetch(`/api/vets/hold-slot?vetId=${vetId}&slotId=${slotId}`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: "Hold slot failed" }));
      throw new Error(errorData.message || "Hold slot failed");
    }

    return await res.json();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Hold slot failed";
    throw new Error(message);
  }
};

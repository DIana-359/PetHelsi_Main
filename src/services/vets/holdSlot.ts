import { apiFetch } from "@/lib/apiFetch.client";
type HoldSlotError = Error & { status: number };

export const holdSlot = async (vetId: string, slotId: number) => {
  try {
    const res = await apiFetch(`/api/vets/hold-slot?vetId=${vetId}&slotId=${slotId}`, {
      method: "POST"
    });

    if (!res.ok) {
      let errorData: { message?: string } = {};
      try {
        errorData = await res.json();
      } catch {}

      const error = new Error(errorData.message || "Hold slot failed") as HoldSlotError;
      error.status = res.status;
      throw error;
    }

    return await res.json();
  } catch (err: unknown) {
    if (err instanceof Error && 'status' in err) {
      throw err as HoldSlotError;
    }

    const error = new Error(
      err instanceof Error ? err.message : "Hold slot failed"
    ) as HoldSlotError;
    error.status = 0;
    throw error;
  }
};
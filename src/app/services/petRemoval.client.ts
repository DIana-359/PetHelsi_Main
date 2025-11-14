export async function deletePetServer(
  id: string,
  bearerToken?: string
): Promise<{ ok: true } | { ok: false; status?: number; error?: string }> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "";
    const url = `${base}/v1/owners/pets/{id}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: bearerToken
        ? {
            Authorization: `Bearer ${bearerToken}`,
          }
        : undefined,
    });

    if (res.status === 204) {
      return { ok: true };
    }

    const text = await res.text().catch(() => "");
    let errorMsg = text;
    try {
      const parsed = text ? JSON.parse(text) : null;
      if (parsed && typeof parsed === "object") {
        errorMsg = parsed.message ?? JSON.stringify(parsed);
      }
    } catch {
      // не JSON — лишаємо текст
    }

    return {
      ok: false,
      status: res.status,
      error: errorMsg || `Status ${res.status}`,
    };
  } catch (err: unknown) {
    console.error("deletePetServer error:", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

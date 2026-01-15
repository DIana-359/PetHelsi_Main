import { GetVetsParams } from "@/types/vetTypes";

export async function getVetsByCriteriaServer(params: GetVetsParams = {}) {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v != null) as [string, string][]
  ).toString();

  const url = `${process.env.API_URL}/v1/vets${query ? `?${query}` : ""}`;

  const res = await fetch(url, {
    next: { revalidate: 0 },
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Помилка отримання ветеринарів: ${res.status} — ${text}`);
  }

  return res.json();
}

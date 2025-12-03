import { Vet } from "@/utils/types/vet";
import { GetVetsParams } from "@/app/types/vetTypes";

export async function getVetsByCriteria(params: GetVetsParams = {}): Promise<Vet[]> {
  try {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, v]) => v != null) as [string, string][]
    ).toString();

    const res = await fetch(`/api/vets/get-vets-by-criteria${query ? `?${query}` : ""}`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`Помилка отримання ветеринарів: ${res.status}`);

    const data = await res.json();
    return data.content;
  } catch (err) {
    console.error("Помилка getVetsByCriteria:", err);
    return [];
  }
}

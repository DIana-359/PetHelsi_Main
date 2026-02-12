import { GetVetsParams } from "@/types/vetTypes";
import { VetsResponse } from "@/utils/types/vet";

export async function getVetsByCriteria(
  params: GetVetsParams = {}
): Promise<VetsResponse> {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v != null) as [string, string][]
  ).toString();

  const res = await fetch(
    `/api/vets/get-vets-by-criteria${query ? `?${query}` : ""}`,
    { headers: { Accept: "application/json" } }
  );

  if (!res.ok) {
    throw new Error(`Помилка отримання ветеринарів: ${res.status}`);
  }

  return res.json();
}

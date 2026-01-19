export async function getVet(vetId: string) {
  const res = await fetch(`/api/vets/${vetId}`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Не вдалося отримати лікаря");
  }

  return res.json();
}

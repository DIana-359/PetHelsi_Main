import { Pet } from "../types/pet";

export async function addPets(pet: Pet): Promise<Pet> {
  try {
    // Лог перед відправкою
    console.log("Attempting to send pet:", pet);

    // Перевірка на undefined/null
    if (!pet) throw new Error("Pet object is undefined or null");

    // Спроба перетворити в JSON
    let body: string;
    try {
      body = JSON.stringify(pet);
    } catch (jsonErr) {
      console.error("JSON.stringify failed:", jsonErr);
      throw new Error("Failed to stringify pet object");
    }

    const res = await fetch(`/api/ownerProfile/add-pet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      credentials: "include",
    });

    // Сервер повернув помилку
    if (!res.ok) {
      const text = await res.text().catch(() => "<no response body>");
      console.error("Server returned error:", res.status, text);
      throw new Error(`Failed to add pet: ${res.status} ${text}`);
    }

    // Перевірка content-type
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const txt = await res.text().catch(() => "<no response body>");
      throw new Error(
        `Unexpected response content-type: ${contentType}. Body: ${txt}`
      );
    }

    // Повертаємо JSON
    const data = await res.json();
    console.log("Pet added successfully:", data);
    return data as Pet;
  } catch (err) {
    // Лог всіх помилок клієнтського рівня
    console.error("addPets error (client):", err);
    throw err;
  }
}

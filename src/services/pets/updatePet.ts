import { Pet } from "@/types/pet";

export const updatePet = async (id: string, pet: Pet) => {
  return fetch(`/api/pets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pet),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getPetById } from "@/services/pets/getPetById";
import { Pet } from "@/types/pet";

export function useGetPetById(id?: string) {
  return useQuery<Pet>({
    queryKey: ["pet", id],
    queryFn: () => getPetById(id!),
    enabled: !!id,
  });
}

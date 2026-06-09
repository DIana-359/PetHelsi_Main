import { useQuery } from "@tanstack/react-query";
import { getPetById } from "@/services/pets/getPetById";
import { queryKeys } from "@/lib/queryKeys";
import { Pet } from "@/types/pet";

export function useGetPetById(id?: string) {
  return useQuery<Pet>({
    queryKey: queryKeys.pets.detail(id ?? ""),
    queryFn: () => getPetById(id!),
    enabled: !!id,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getPets } from "@/services/pets/getPets";
import { Pet } from "@/types/pet";
import { queryKeys } from "@/lib/queryKeys";

export function useGetPets() {
  return useQuery<Pet[], Error>({
    queryKey: queryKeys.pets.all,
    queryFn: getPets,
  });
}

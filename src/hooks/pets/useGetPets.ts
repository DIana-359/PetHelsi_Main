import { useQuery } from "@tanstack/react-query";
import { getPets } from "@/services/pets/getPets";
import { Pet } from "@/types/pet";

export function useGetPets() {
  return useQuery<Pet[], Error>({
    queryKey: ["pets"],
    queryFn: async () => {
      const data = await getPets();

      if (Array.isArray(data)) return data;
      return [];
    },
  });
}

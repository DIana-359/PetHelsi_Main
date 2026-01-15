import { useQuery } from "@tanstack/react-query";
import { getVetsByCriteria } from "@/services/vets/getVetsByCriteria";
import { GetVetsParams } from "@/types/vetTypes";

export function useVetsByCriteria(params: GetVetsParams) {
  return useQuery({
    queryKey: ["vetsByCriteria", params],
    queryFn: () => getVetsByCriteria(params),
    refetchOnWindowFocus: false,
  });
}
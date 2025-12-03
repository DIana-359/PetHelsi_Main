import { useQuery } from "@tanstack/react-query";
import { getVetsByCriteria } from "@/app/services/vets/getVetsByCriteria";
import { GetVetsParams } from "@/app/types/vetTypes";

export function useVetsByCriteria(params: GetVetsParams) {
  return useQuery({
    queryKey: ["vetsByCriteria", params],
    queryFn: () => getVetsByCriteria(params),
    refetchOnWindowFocus: false,
  });
}
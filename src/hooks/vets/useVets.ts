import { useQuery } from "@tanstack/react-query";
import { getVetsByCriteria } from "@/services/vets/getVetsByCriteria";
import { GetVetsParams } from "@/types/vetTypes";
import { VetsResponse } from "@/utils/types/vet";

export function useVetsByCriteria(params: GetVetsParams) {
  return useQuery<VetsResponse>({
    queryKey: ["vetsByCriteria", params],
    queryFn: () => getVetsByCriteria(params),
    refetchOnWindowFocus: false,
  });
}
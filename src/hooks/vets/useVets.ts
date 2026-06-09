import { useQuery } from "@tanstack/react-query";
import { getVetsByCriteria } from "@/services/vets/getVetsByCriteria";
import { GetVetsParams } from "@/types/vetTypes";
import { VetsResponse } from "@/types/vetTypes";
import { queryKeys } from "@/lib/queryKeys";

export function useVetsByCriteria(params: GetVetsParams) {
  return useQuery<VetsResponse>({
    queryKey: queryKeys.vets.byCriteria(params),
    queryFn: () => getVetsByCriteria(params),
    refetchOnWindowFocus: false,
  });
}
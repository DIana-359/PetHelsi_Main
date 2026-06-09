import { useQuery } from "@tanstack/react-query";
import { fetchFreeScheduleSlots } from "@/services/vets/fetchFreeScheduleSlots";
import { queryKeys } from "@/lib/queryKeys";

export function useFreeScheduleSlots(vetId: string) {
  return useQuery({
    queryKey: queryKeys.vets.freeSlots(vetId),
    queryFn: () =>
      fetchFreeScheduleSlots(vetId),
    enabled: !!vetId,
  });
}
import { useQuery } from "@tanstack/react-query";
import { fetchFreeScheduleSlots } from "@/app/services/vet/fetchFreeScheduleSlots";

export function useFreeScheduleSlots(vetId: string) {
  return useQuery({
    queryKey: ["free-schedule-slots", vetId],
    queryFn: () =>
      fetchFreeScheduleSlots(vetId),
    enabled: !!vetId,
  });
}
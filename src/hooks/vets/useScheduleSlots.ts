import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { fetchScheduleSlots } from "@/services/vets/fetchScheduleSlots";
import { queryKeys } from "@/lib/queryKeys";

export function useScheduleSlots(vetId: string, date: Dayjs | null) {
  return useQuery({
    queryKey: queryKeys.vets.scheduleSlots(vetId, date?.format("YYYY-MM-DD")),
    queryFn: () =>
      fetchScheduleSlots(vetId, date!.format("YYYY-MM-DD")),
    enabled: !!vetId && !!date,
    select: (data) =>
      data.sort((a, b) => a.startTime.localeCompare(b.startTime)),
  });
}
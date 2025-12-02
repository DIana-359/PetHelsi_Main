import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { fetchScheduleSlots } from "@/app/services/vet/fetchScheduleSlots";

export function useScheduleSlots(vetId: string, date: Dayjs | null) {
  return useQuery({
    queryKey: ["schedule-slots", vetId, date?.format("YYYY-MM-DD")],
    queryFn: () =>
      fetchScheduleSlots(vetId, date!.format("YYYY-MM-DD")),
    enabled: !!vetId && !!date,
    select: (data) =>
      data.sort((a, b) => a.startTime.localeCompare(b.startTime)),
  });
}
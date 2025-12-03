type Slot = {
  id: number;
  scheduleId: number;
  date: string;
  doctorId: number;
  doctorShortName: string;
  doctorFullName: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  rate: number;
};

export async function fetchFreeScheduleSlots(vetId: string): Promise<Slot[]> {
  const res = await fetch(`/api/vets/free-schedule-slots?vetId=${vetId}`);

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Failed to fetch free slots");
    throw new Error(errorText);
  }

  const data: Slot[] = await res.json();
  return data;
}

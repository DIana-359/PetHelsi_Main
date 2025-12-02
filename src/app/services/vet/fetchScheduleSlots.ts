type Slot = {
  id: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export async function fetchScheduleSlots(vetId: string, date: string): Promise<Slot[]> {
  const res = await fetch(`/api/vet/schedule-slots?vetId=${vetId}&date=${date}`);
  if (!res.ok) throw new Error("Failed to fetch slots");
  return res.json();
}
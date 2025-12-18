type Slot = {
  id: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

export async function fetchScheduleSlots(vetId: string, date: string): Promise<Slot[]> {
  const res = await fetch(`/api/vets/schedule-slots?vetId=${vetId}&date=${date}`);

  if (!res.ok) {
    const errorText = await res.text().catch(() => "Failed to fetch slots");
    throw new Error(errorText);
  }

  const data: Slot[] = await res.json();
  return data;
}

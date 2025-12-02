type Slot = {
    id: number,
    scheduleId: number,
    date: string,
    doctorId: number,
    doctorShortName: string,
    doctorFullName: string,
    startTime: string,
    endTime: string,
    isAvailable: boolean,
    rate: number
};

export async function fetchFreeScheduleSlots(vetId: string): Promise<Slot[]> {
    const res = await fetch(`/api/vet/free-schedule-slots?vetId=${vetId}`);
    if (!res.ok) throw new Error("Failed to fetch free slots");
    return res.json();
}
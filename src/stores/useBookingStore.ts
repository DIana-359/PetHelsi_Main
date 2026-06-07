import { create } from "zustand";
import dayjs, { Dayjs } from "dayjs";

interface BookingStore {
  selectedDate: Dayjs | null;
  selectedTime: string | null;
  price: number | null;
  slotId: number | null;
  setSelectedDate: (date: Dayjs) => void;
  setSelectedTime: (time: string | null) => void;
  setPrice: (price: number) => void;
  setSlotId: (slotId: number) => void;
}

export const useBookingStore = create<BookingStore>(set => ({
  selectedDate: dayjs(),
  selectedTime: null,
  price: null,
  slotId: null,
  setSelectedDate: date => set({ selectedDate: date }),
  setSelectedTime: time => set({ selectedTime: time }),
  setPrice: price => set({ price }),
  setSlotId: slotId => set({ slotId }),
}));

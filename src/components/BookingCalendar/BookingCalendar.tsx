"use client";

import { useState } from "react";
import { Dayjs } from "dayjs";
import CalendarWeek from "./ui/CalendarWeek";
import { useRouter } from "next/navigation";
import { TimeZoneDisplay } from "./ui/TimeZoneDisplay";
import TimeSlots from "./ui/TimeSlots";
import BookingSummary from "./ui/BookingSummary";
import { useScheduleSlots } from "@/hooks/vets/useScheduleSlots";
import { useBooking } from "@/contextBooking/contextBooking";
import { holdSlot } from "@/app/services/vets/holdSlot";
import clsx from "clsx";

type Props = {
  vetId: string;
  variant?: "desktop" | "mobile";
};

export default function BookingCalendar({ vetId, variant = "desktop" }: Props) {
  const router = useRouter();
  const {selectedDate, setSelectedDate, selectedTime, setSelectedTime, slotId} = useBooking();
  const { data: timeSlots = [], isLoading } = useScheduleSlots(vetId, selectedDate);
  const [error, setError] = useState<string | null>(null);

  const holdSelectedSlot = async () => {
    if (!slotId) {
      setError("Не вдалось визначити слот для бронювання");
      return;
    }

    try {
      setError(null);

      const data = await holdSlot(vetId, slotId);
      console.log("Slot successfully held:", data);
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Сталася помилка під час бронювання";
      setError(message);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Оберіть час, щоб записатися на прийом");
      return;
    }

    setError(null);
    const result = await holdSelectedSlot();
    if (!result) return;
    router.push(`/veterinarians/${vetId}/booking`);
  };

  const handleSelectDate = (date: Dayjs) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  return (
    <div 
      className={clsx(
        variant === "desktop" && "hidden md:block w-[465px] border border-gray-100 text-gray-900 rounded-[8px] px-10 py-8 mt-21",
        variant === "mobile" && "block md:hidden w-full"
      )}
    >

      <CalendarWeek onSelectDate={handleSelectDate} />

      <TimeZoneDisplay />

      {isLoading && <p className="text-sm text-gray-500">Завантаження…</p>}

      {selectedDate && !isLoading && (
        <div className="mb-8">
          <TimeSlots timeSlots={timeSlots} variant={variant} />

          {error && (
            <div className="bg-red-100 rounded-sm text-error-500 font-bold text-center text-xs p-1 mt-3">
              {error}
            </div>
          )}
        </div>
      )}

      {variant === "desktop" && <BookingSummary onBook={handleBooking} />}
    </div>
  );
}

"use client";

import { Dayjs } from "dayjs";
import CalendarWeek from "./ui/CalendarWeek";
import { TimeZoneDisplay } from "./ui/TimeZoneDisplay";
import TimeSlots from "./ui/TimeSlots";
import BookingSummary from "@/components/BookingCalendar/ui/BookingSummary";
import { useScheduleSlots } from "@/hooks/vets/useScheduleSlots";
import { useBooking } from "@/contextBooking/contextBooking";
import clsx from "clsx";
import { Pulse } from "@/components/Pulse";

type Props = {
  vetId: string;
  variant?: "desktop" | "mobile";
  onBook?: () => void;
  error?: string | null;
  setError?: (error: string | null) => void;
};

export default function BookingCalendar({ vetId, variant = "desktop", onBook, error, setError }: Props) {
  const { selectedDate, setSelectedDate, setSelectedTime } = useBooking();
  const { data: timeSlots = [], isLoading } = useScheduleSlots(vetId, selectedDate);

  const handleSelectDate = (date: Dayjs) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setError?.(null);
  };

  return (
    <div 
      className={clsx(
        variant === "desktop" && "hidden lg:block w-[465px] border border-gray-100 text-gray-900 rounded-[8px] px-10 py-8 mt-21",
        variant === "mobile" && "block w-full"
      )}
    >

      <CalendarWeek onSelectDate={handleSelectDate} />

      <TimeZoneDisplay />

      {isLoading && <Pulse />}

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

      {variant === "desktop" && timeSlots.length !== 0 && onBook && (
        <BookingSummary onBook={onBook} />
      )}
    </div>
  );
}

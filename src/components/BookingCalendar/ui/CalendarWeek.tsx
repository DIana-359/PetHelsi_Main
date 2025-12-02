"use client";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/uk";
import { useEffect, useMemo, useState } from "react";
import { WEEK_DAYS } from "@/app/Constants";
import Icon from "@/components/Icon";
import clsx from "clsx";
import isoWeek from "dayjs/plugin/isoWeek";
import { useBooking } from "@/contextBooking/contextBooking";

dayjs.extend(isoWeek);

interface Props {
  onSelectDate: (date: Dayjs) => void;
}

export default function CalendarWeek({ onSelectDate }: Props) {
  const {selectedDate} = useBooking();
  const today = dayjs().startOf("day");

  const [currentWeekStart, setCurrentWeekStart] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (!currentWeekStart || !selectedDate?.isSame(currentWeekStart, "week")) {
      setCurrentWeekStart((selectedDate || today).startOf("isoWeek"));
    }
  }, [selectedDate]);

  const days = useMemo(() => {
    if (!currentWeekStart) return [];
    return Array.from({ length: 7 }, (_, i) => currentWeekStart.add(i, "day"));
  }, [currentWeekStart]);

  if (!currentWeekStart) {
    return null;
  }

  const endOfWeek = currentWeekStart.add(6, "day");
  const currentMonth =
    currentWeekStart.month() === endOfWeek.month()
      ? currentWeekStart.locale("uk").format("MMMM YYYY")
      : `${currentWeekStart.locale("uk").format("MMM")} – ${endOfWeek.locale("uk").format("MMM YYYY")}`;

  const prevWeekEnd = currentWeekStart.subtract(1, "day");
  const prevDisabled = prevWeekEnd.isBefore(today.startOf("isoWeek"), "day");

  const goPrev = () => {
    if (!prevDisabled && currentWeekStart) {
      setCurrentWeekStart(currentWeekStart.subtract(7, "day"));
    }
  }

  const goNext = () => {
    if (currentWeekStart) {
      setCurrentWeekStart(currentWeekStart.add(7, "day"));
    }
  }

  const handleSelect = (day: Dayjs) => {
    onSelectDate(day);
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goPrev}
          disabled={prevDisabled}
          aria-label="Попередній тиждень"
          className={clsx(
            "transition",
            prevDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
          )}
        >
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="arrow-left"
            width="24px"
            height="24px"
            className={clsx(
              "stroke-gray-200",
              !prevDisabled && "hover:stroke-primary"
            )}
          />
        </button>

        <h2 className="font-lato capitalize text-[16px] text-gray">{currentMonth}</h2>

        <button onClick={goNext} aria-label="Наступний тиждень">
          <Icon
            sprite="/sprites/sprite-sistem.svg"
            id="arrow-rigth"
            width="24px"
            height="24px"
            className="stroke-gray-200 hover:stroke-primary cursor-pointer"
          />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-4 text-gray-400 mb-2">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="font-lato">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center">
        {days.map((day) => {
          const isPast = day.isBefore(today, "day");
          const isSelected = selectedDate?.isSame(day, "day");

          return (
            <button
              key={day.format("YYYY-MM-DD")}
              onClick={() => !isPast && handleSelect(day)}
              disabled={isPast}
              className={clsx(
                "rounded-[1000px] text-base/4 h-[35px]",
                {
                  "bg-primary text-white": isSelected,
                  "text-gray-900": !isSelected && !isPast,
                  "text-gray-200 cursor-not-allowed": isPast,
                  "cursor-pointer hover:bg-blue-100": !isPast,
                }
              )}
            >
              {day.date()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client"

import { useBooking } from "@/contextBooking/contextBooking"
import clsx from "clsx"
import { getFormattedDate } from "@/utils/date/getFormattedDate"
import { useEffect } from "react"
import dayjs from "dayjs"

interface Props {
  freeScheduleSlots: {
    id: number
    scheduleId: number
    date: string
    doctorId: number
    doctorShortName: string
    doctorFullName: string
    startTime: string
    endTime: string
    isAvailable: boolean
    rate: number
  }[]
}

export default function FreeVetScheduleSlots({ freeScheduleSlots }: Props) {
  const { selectedTime, setSelectedTime, setPrice, setSelectedDate } = useBooking()

  useEffect(() => {
    if (!selectedTime) return

    const matchedSlot = freeScheduleSlots.find(
      (slot) => slot.startTime.slice(0, 5) === selectedTime
    )

    if (matchedSlot) {
      setPrice(matchedSlot.rate)
    }
  }, [selectedTime, freeScheduleSlots, setPrice])

  return (
    <div className="flex gap-2 overflow-x-auto">
      {freeScheduleSlots.map((slot) => {
        const formattedTime = slot.startTime.slice(0, 5)
        const formattedDate = getFormattedDate(slot.date)
        const isSelected = selectedTime === formattedTime

        return (
          <button
            key={slot.id}
            onClick={() => {setSelectedTime(formattedTime); setPrice(slot.rate); setSelectedDate(dayjs(slot.date))}}
            className={clsx(
              "flex flex-col items-center border rounded-md px-7 py-[6px] min-w-[128px] transition-colors",
              isSelected
                ? "border-primary-700"
                : "border-gray-350"
            )}
          >
            <p className="text-xs font-medium text-gray-500 leading-[14px]">{formattedDate}</p>
            <p className="text-base text-gray leading-[19px]">{formattedTime}</p>
            <p className="text-xs font-medium text-gray leading-[14px]">{slot.rate} UAH</p>
          </button>
        )
      })}
    </div>
  )
}
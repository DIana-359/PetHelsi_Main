import { useBooking } from "@/contextBooking/contextBooking"
import { getFormattedDate } from "@/utils/date/getFormattedDate"

export default function BookingSummaryMobile() {
  const { price, selectedTime, selectedDate } = useBooking()

  if (!selectedDate || !selectedTime) return null

  const formattedDate = getFormattedDate(selectedDate.toISOString(), "short")

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-[55]">
      <div className="flex flex-col">
        <p className="text-xs text-gray-500">
          {formattedDate} о {selectedTime}
        </p>
        <p className="text-lg font-semibold text-gray-900">{price} UAH</p>
      </div>
      <button
        type="button"
        className="bg-primary-700 text-white font-medium rounded-lg px-5 py-2 text-sm hover:bg-primary-800 transition-colors"
      >
        Забронювати
      </button>
    </div>
  )
}
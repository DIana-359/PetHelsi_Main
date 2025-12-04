import { useBooking } from "@/contextBooking/contextBooking"
import { useBookingFlow } from "@/hooks/booking/useBookingFlow";
import { getFormattedDate } from "@/utils/date/getFormattedDate"

type Props = {
  vetId: string;
  openSignUp?: () => void;
};

export default function BookingSummaryMobile({ vetId, openSignUp }: Props) {
  const { price, selectedTime, selectedDate } = useBooking();
  const { error, handleBooking } = useBookingFlow({ vetId, openSignUp });

  if (!selectedDate || !selectedTime) return null

  const formattedDate = getFormattedDate(selectedDate.toISOString(), "short")

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-[55]">
      {error && (
        <div className="bg-red-100 text-error-500 text-xs text-center p-2 rounded">
          {error}
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-xs text-gray-500">
          {formattedDate} о {selectedTime}
        </p>
        <p className="text-lg font-semibold text-gray-900">{price} UAH</p>
      </div>
      <button
        onClick={handleBooking}
        type="button"
        className="bg-primary-700 text-white font-medium rounded-lg px-5 py-2 text-sm hover:bg-primary-800 transition-colors"
      >
        Забронювати
      </button>
    </div>
  )
}
import clsx from "clsx";
import { useBooking } from "@/contextBooking/contextBooking";

interface Props {
  timeSlots: {
    id: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
  variant?: "desktop" | "mobile";
}

export default function TimeSlots({ timeSlots, variant = "desktop" }: Props) {
  const {selectedTime, setSelectedTime, setSlotId} = useBooking()
  if (timeSlots.length === 0) {
    return <p className="text-center text-gray-500 mt-4">Вільних слотів немає</p>;
  }

  const handleSelectTimeSlot = (formattedTime: string, slotId: number, isAvailable: boolean) => {
    if (!isAvailable) return;

    setSelectedTime(formattedTime);
    setSlotId(slotId);
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-2 text-center">
      {timeSlots.map((slot) => {
        const formattedTime = slot.startTime.slice(0, 5);

        return (
          <button
            key={slot.id}
            onClick={() => handleSelectTimeSlot(formattedTime, slot.id, slot.isAvailable)}
            disabled={!slot.isAvailable}
            className={clsx(
              "px-4 rounded-[8px] border text-sm/[17px] flex items-center justify-center",
              {
                "h-[33px] py-2": variant === "desktop",
                "h-[44px] py-[13.5px]": variant === "mobile",
                "border-primary-700 text-primary-700 cursor-pointer": slot.isAvailable && selectedTime === formattedTime,
                "hover:border-primary-700 hover:text-primary-700 border-primary-300 text-gray-900 cursor-pointer": slot.isAvailable && selectedTime !== formattedTime,
                "border-gray-200 text-gray-200 cursor-not-allowed": !slot.isAvailable,
              }
            )}
          >
            {formattedTime}
          </button>
        );
      })}
    </div>
  );
}

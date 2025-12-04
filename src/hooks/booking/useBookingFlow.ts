"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { holdSlot } from "@/app/services/vets/holdSlot";
import { useBooking } from "@/contextBooking/contextBooking";

type Params = {
  vetId: string;
  openSignUp?: () => void;
};

export function useBookingFlow({ vetId, openSignUp }: Params) {
  const router = useRouter();
  const { selectedDate, selectedTime, slotId } = useBooking();
  const [error, setError] = useState<string | null>(null);

  const holdSelectedSlot = async () => {
    if (!slotId) {
      setError("Не вдалось визначити слот для бронювання");
      return null;
    }

    try {
      const data = await holdSlot(vetId, slotId);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Сталася помилка під час бронювання";
      setError(message);
      return null;
    }
  };

  const handleBooking = async () => {
    if (openSignUp) {
      openSignUp();
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError("Оберіть час, щоб записатися на прийом");
      return;
    }

    setError(null);

    const result = await holdSelectedSlot();
    if (!result) return;

    router.push(`/veterinarians/${vetId}/booking`);
  };

  return {
    error,
    handleBooking,
  };
}

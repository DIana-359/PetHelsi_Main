"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { holdSlot } from "@/services/vets/holdSlot";
import { useBooking } from "@/contextBooking/contextBooking";

type Params = {
  vetId: string;
  openSignUp?: () => void;
  onSlotConflict?: () => void;
};

type SlotResponse = {
  ownerId: number;
  appointmentId: number;
  scheduleSlotId: number;
  expiresAt: string;
};

type HoldSlotError = Error & { status: number };

export function useBookingFlow({ vetId, openSignUp, onSlotConflict, }: Params) {
  const router = useRouter();
  const { selectedDate, selectedTime, slotId } = useBooking();
  const [error, setError] = useState<string | null>(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  const holdSelectedSlot = async (): Promise<SlotResponse | null> => {
    if (!slotId) {
      setError("Не вдалось визначити слот для бронювання");
      return null;
    }

    try {
      const data = await holdSlot(vetId, slotId);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error && 'status' in err) {
        const holdErr = err as HoldSlotError;

        if (holdErr.status === 409) {
          onSlotConflict?.();
          return null;
        }

        setError(holdErr.message);
        return null;
      }

      setError("Сталася помилка під час бронювання");
      return null;
    }
  };

  const handleBooking = async () => {
    if (isBookingLoading) return;

    if (openSignUp) {
      openSignUp();
      return;
    }

    if (!selectedDate || !selectedTime) {
      setError("Оберіть час, щоб записатися на прийом");
      return;
    }

    setError(null);
    setIsBookingLoading(true);

    const result = await holdSelectedSlot();

    if (!result) {
      setIsBookingLoading(false);
      return;
    }

    router.push(`/veterinarians/${vetId}/booking`);
  };

  return {
    error,
    setError,
    handleBooking,
    isBookingLoading
  };
}

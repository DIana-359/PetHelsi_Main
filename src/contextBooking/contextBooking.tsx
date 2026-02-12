"use client";
import { createContext, useContext, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

interface BookingContextType {
  selectedDate: Dayjs | null;
  setSelectedDate: (date: Dayjs) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  price: number | null;
  setPrice: (price: number) => void;
  slotId: number | null;
  setSlotId: (slotId: number) => void;
}

const ContextBooking = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [slotId, setSlotId] = useState<number | null>(null);

  const value: BookingContextType = {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    price,
    setPrice,
    slotId,
    setSlotId,
  };

  return (
    <ContextBooking.Provider value={value}>{children}</ContextBooking.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(ContextBooking);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
};

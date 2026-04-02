import { Pet } from "@/types/pet";
import { useEffect, useState } from "react";

export function usePetBirthDate(data: Pet | undefined) {
  const [selected, setSelected] = useState<Date>();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [isBirthDateUnknown, setIsBirthDateUnknown] = useState(false);
  const [birthMonth, setBirthMonth] = useState<string>("");
  const [birthYear, setBirthYear] = useState<string>("");

  useEffect(() => {
    if (!data) return;
    setSelected(data.birthDate ? new Date(data.birthDate) : undefined);
  }, [data]);

  return {
    selected,
    setSelected,
    isOpenCalendar,
    setIsOpenCalendar,
    isBirthDateUnknown,
    setIsBirthDateUnknown,
    birthMonth,
    setBirthMonth,
    birthYear,
    setBirthYear,
  };
}

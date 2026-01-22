import { useState } from "react";
import { Pet } from "@/types/pet";

interface UsePetValidationProps {
  newPet: Partial<Pet>;
  isBirthDateUnknown: boolean;
  birthYear?: string;
}

export function usePetValidation({
  newPet,
  isBirthDateUnknown,
  birthYear,
}: UsePetValidationProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!newPet.name) newErrors.name = "Заповніть поле";
    if (!newPet.petTypeName) newErrors.petTypeName = "Заповніть поле";
    if (!newPet.genderTypeName) newErrors.genderTypeName = "Заповніть поле";
    if (!newPet.weight || newPet.weight <= 0) {
      newErrors.weight = "Вага повинна бути більше 0 кг";
      newErrors.weight = "Заповніть поле";
    }
    if (newPet.sterilized === undefined)
      newErrors.sterilized = "Заповніть поле";

    if (!isBirthDateUnknown && !newPet.birthDate)
      newErrors.birthDate = "Заповніть поле";
    if (isBirthDateUnknown && !birthYear)
      newErrors.birthYear = "Заповніть поле";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getError = (field: string) => errors[field] || "";

  const clearError = (field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return { errors, validate, getError, clearError };
}

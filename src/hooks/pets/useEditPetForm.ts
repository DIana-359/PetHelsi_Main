import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { petSchema, PetFormValues } from "@/utils/schemas/pet.schemas";
import { Pet } from "@/types/pet";
import { useEffect } from "react";

export function useEditPetForm(data: Pet | undefined) {
  const methods = useForm<PetFormValues>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      petTypeName: "",
      breed: "",
      genderTypeName: undefined,
      weight: 0,
      sterilized: false,
      allergies: [],
      birthDate: "",
    },
    mode: "onChange",
  });

  const { reset } = methods;

  useEffect(() => {
    if (!data) return;

    const normalized: PetFormValues = {
      name: data.name,
      petTypeName: data.petTypeName,
      breed: data.breed || "",
      genderTypeName: data.genderTypeName as "Хлопчик" | "Дівчинка",
      weight: data.weight,
      sterilized: data.sterilized,
      allergies: data.allergies || [],
      birthDate: data.birthDate || "",
    };

    reset(normalized);
  }, [data, reset]);

  return methods;
}

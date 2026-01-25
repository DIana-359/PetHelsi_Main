"use client";

import { Button } from "@heroui/react";
import { Pet } from "@/types/pet";
import { addPet } from "@/services/addPet";
import { addPetAvatar } from "@/services/addPetAvatar";
import { useRouter } from "next/navigation";

interface AddPetFormBtnProps {
  newPet: Partial<Pet>;
  image: { preview: string; file: File } | null;
  setCreatedPet: (pet: Pet) => void;
  setIsCreatedModalOpen: (v: boolean) => void;
  isBirthDateUnknown: boolean;
  birthMonth?: string;
  birthYear?: string;
  validate: () => boolean;
}

export default function AddPetFormBtn({
  newPet,
  image,
  setCreatedPet,
  setIsCreatedModalOpen,
  // isBirthDateUnknown,
  birthMonth,
  birthYear,
  validate,
}: AddPetFormBtnProps) {
  const router = useRouter();

  const handleAddForm = async () => {
    if (!validate()) return;

    const pet: Pet = {
      name: newPet.name!,
      petTypeName: newPet.petTypeName!,
      breed: newPet.breed!,
      genderTypeName: newPet.genderTypeName!,
      color: newPet.color,
      weight: newPet.weight!,
      birthDate: newPet.birthDate
        ? newPet.birthDate
        : birthMonth
          ? `${birthYear}-${birthMonth.padStart(2, "0")}-01`
          : `${birthYear}-01-01`,
      avatar: newPet.avatar,
      sterilized: newPet.sterilized!,
      allergies: newPet.allergies || [],
      checked: true,
    };

    try {
      const created = await addPet(pet);

      if (!created.data) {
        alert("Не вдалося додати тварину");
        return;
      }

      if (image?.file && created.data.id) {
        await addPetAvatar(created.data.id.toString(), image.file);
      }

      setCreatedPet({
        ...pet,
        avatar: image?.preview ?? pet.avatar,
      });

      setIsCreatedModalOpen(true);
    } catch {
      alert("Помилка додавання тварини");
    }
  };

  return (
    <div className="w-full md:max-w-[304px] flex flex-col gap-2">
      <Button
        color="primary"
        type="button"
        onPress={handleAddForm}
        className="w-full md:w-[304px] rounded-[8px]"
      >
        Додати тварину
      </Button>

      <Button
        variant="light"
        onPress={() => router.back()}
        className="w-full md:w-[304px] rounded-md text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] border-primary-700"
      >
        Скасувати
      </Button>
    </div>
  );
}

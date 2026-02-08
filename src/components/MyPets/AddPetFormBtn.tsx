"use client";

import { Button } from "@heroui/react";
import { Pet } from "@/types/pet";
import { useAddPet } from "@/hooks/pets/useAddPet";
import { useAddPetAvatar } from "@/hooks/pets/useAddPetAvatar";
import { useRouter } from "next/navigation";
import { petBirthDate } from "@/utils/petBirthDate/petBirthDate";

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
  birthMonth,
  birthYear,
  validate,
}: AddPetFormBtnProps) {
  const router = useRouter();

  const { mutate: addPetMutate } = useAddPet();
  const { mutateAsync: addPetAvatarMutate } = useAddPetAvatar();

  const handleAddForm = async () => {
    if (!validate()) return;

    const birthDate = petBirthDate({
      birthDate: newPet.birthDate,
      birthYear,
      birthMonth,
    });

    const pet: Pet = {
      name: newPet.name!,
      petTypeName: newPet.petTypeName!,
      breed: newPet.breed!,
      genderTypeName: newPet.genderTypeName!,

      weight: newPet.weight!,
      birthDate,
      avatar: newPet.avatar,
      sterilized: newPet.sterilized!,
      allergies: newPet.allergies || [],
      checked: true,
    };

    addPetMutate(pet, {
      onSuccess: async (createdPet) => {
        if (image?.file && createdPet.id) {
          await addPetAvatarMutate({
            petId: createdPet.id.toString(),
            file: image.file,
          });
        }

        setCreatedPet({
          ...pet,
          avatar: image?.preview ?? pet.avatar,
          id: createdPet.id,
        });

        setIsCreatedModalOpen(true);
      },
      onError: (error) => {
        alert(error.message || "Помилка додавання тварини");
      },
    });
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

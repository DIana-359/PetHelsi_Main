"use client";

import { Button } from "@heroui/react";
import { Pet } from "@/types/pet";
import { useAddPet } from "@/hooks/pets/useAddPet";
import { useAddPetAvatar } from "@/hooks/pets/useAddPetAvatar";
import { useRouter } from "next/navigation";
import { petBirthDate } from "@/utils/petBirthDate/petBirthDate";
import { UseFormReturn } from "react-hook-form";
import { PetFormValues } from "@/utils/schemas/pet.schemas";
import { PetAvatar } from "@/types/petAvatar";

interface AddPetFormBtnProps {
  methods: UseFormReturn<PetFormValues>;
  image: PetAvatar | null;
  setCreatedPet: (pet: Pet) => void;
  setIsCreatedModalOpen: (v: boolean) => void;
}

export default function AddPetFormBtn({
  methods,
  image,
  setCreatedPet,
  setIsCreatedModalOpen,
}: AddPetFormBtnProps) {
  const router = useRouter();
  const { handleSubmit } = methods;

  const { mutateAsync: addPetMutateAsync } = useAddPet();
  const { mutateAsync: addPetAvatarMutate } = useAddPetAvatar();

  const handleCreatePet = async (data: PetFormValues) => {
    try {
      const birthDate = petBirthDate({
        birthDate: data.birthDate,
      });

      const pet: Pet = {
        ...data,
        birthDate,
        avatar: image?.preview,
        allergies: data.allergies || [],
        checked: true,
      };

      const createdPet = await addPetMutateAsync(pet);

      if (image?.file && createdPet.id) {
        await addPetAvatarMutate({
          petId: createdPet.id.toString(),
          file: image.file,
        });
      }

      setCreatedPet({
        ...pet,
        id: createdPet.id,
      });

      setIsCreatedModalOpen(true);
    } catch (error: unknown) {
      alert(
        error instanceof Error ? error.message : "Помилка додавання тварини",
      );
    }
  };

  return (
    <div className="w-full md:max-w-[304px] flex flex-col gap-2">
      <Button
        color="primary"
        type="button"
        onPress={() => handleSubmit(handleCreatePet)()}
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

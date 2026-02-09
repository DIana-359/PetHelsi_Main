"use client";

import { Pet } from "@/types/pet";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useUpdatePet } from "@/hooks/pets/useUpdatePet";
// import { useUpdatePetAvatar } from "@/hooks/pets/useUpdatePetAvatar";
import { useDeletePet } from "@/hooks/pets/useDeletePet";
import { petBirthDate } from "@/utils/petBirthDate/petBirthDate";

interface EditPetFormBtnProps {
  pet: Partial<Pet>;
  setPet: React.Dispatch<React.SetStateAction<Partial<Pet>>>;
  image: { preview: string; file: File } | null;
  birthMonth?: string;
  birthYear?: string;
  onCancel: () => void;
  validate: () => boolean;
}

export default function EditPetFormBtn({
  pet,
  setPet,
  image,
  birthMonth,
  birthYear,
  onCancel,
  validate,
}: EditPetFormBtnProps) {
  const router = useRouter();

  const { mutate: updatePetMutate, isPending: isUpdating } = useUpdatePet();
  // const { mutateAsync: updateAvatar } = useUpdatePetAvatar();
  const { mutate: deletePetMutate, isPending } = useDeletePet();

  const birthDate = petBirthDate({
    birthDate: pet.birthDate,
    birthYear,
    birthMonth,
  });

  const handleEditForm = async () => {
    if (!validate() || !pet.id) return;

    const updatedPet: Pet = {
      id: pet.id,
      name: pet.name!,
      petTypeName: pet.petTypeName!,
      breed: pet.breed!,
      genderTypeName: pet.genderTypeName!,
      weight: pet.weight!,
      birthDate,
      avatar: pet.avatar,
      sterilized: pet.sterilized!,
      allergies: pet.allergies || [],
      checked: true,
    };

    updatePetMutate(
      { id: pet.id.toString(), pet: updatedPet },
      {
        onSuccess: async () => {
          if (image?.file) {
            // const publicUrl = await updateAvatar({
            //   petId: pet.id!.toString(),
            //   file: image.file,
            // });
            // setPet((prev) => ({ ...prev, avatar: publicUrl, birthDate }));
          } else {
            setPet((prev) => ({ ...prev, birthDate }));
          }

          router.push("/owner/pets");
        },
        onError: (error) => {
          alert(error.message || "Помилка редагування профілю тварини");
        },
      },
    );
  };
  const handleDelete = async () => {
    if (!pet.id) return;

    const confirmDelete = confirm(
      "Ви впевнені, що хочете видалити профіль цієї тварини?",
    );
    if (!confirmDelete) return;

    deletePetMutate(pet.id.toString(), {
      onSuccess: () => {
        router.push("/owner/pets");
      },
      onError: () => {
        alert("Помилка видалення профілю тварини");
      },
    });
  };

  return (
    <div className="w-full md:max-w-[304px] flex flex-col gap-2">
      <Button
        color="primary"
        type="button"
        onClick={handleEditForm}
        isDisabled={isUpdating}
        className="w-full md:w-[304px] rounded-[8px]"
      >
        Зберегти зміни
      </Button>

      <Button
        variant="light"
        type="button"
        onPress={() => router.back()}
        onClick={onCancel}
        className="w-full md:w-[304px] rounded-md text-[16px] font-[400] leading-[1.4] text-primary-700 bg-background border-[1px] border-primary-700 mb-8"
      >
        Скасувати
      </Button>
      <div className="flex items-center justify-center md:justify-start gap-3">
        <Image
          src="/delete.svg"
          alt="delete pet"
          aria-hidden="true"
          width={20}
          height={20}
        />
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="text-[14px] font-[400] text-[#f11c0e]"
        >
          Видалити профіль
        </button>
      </div>
    </div>
  );
}

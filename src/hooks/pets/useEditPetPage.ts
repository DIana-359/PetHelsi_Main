"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Pet } from "@/types/pet";
import { usePetValidation } from "@/hooks/petFieldError/usePetValidation";
import { useGetPetById } from "@/hooks/pets/useGetPetById";
import { useUpdatePet } from "@/hooks/pets/useUpdatePet";
import { useUpdatePetAvatar } from "@/hooks/pets/useUpdatePetAvatar";
import { petBirthDate } from "@/utils/petBirthDate/petBirthDate";
import { useUnsavedChanges } from "@/hooks/pets/useUnsavedChanges";
import { normalizeAvatar } from "@/utils/getPublicAvatarUrl";

export function useEditPetPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [pet, setPet] = useState<Partial<Pet>>({});
  const [initialPet, setInitialPet] = useState<Pet | null>(null);
  const [image, setImage] = useState<{ preview: string; file: File } | null>(
    null,
  );
  const [selected, setSelected] = useState<Date>();
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [showAvatarSuccess, setShowAvatarSuccess] = useState(false);
  const [isBirthDateUnknown, setIsBirthDateUnknown] = useState(false);
  const [birthMonth, setBirthMonth] = useState<string>();
  const [birthYear, setBirthYear] = useState<string>();
  const initialSnapshotRef = useRef<string | null>(null);

  const { data, isLoading } = useGetPetById(id);
  const { mutate: updatePetMutate } = useUpdatePet();
  const { mutateAsync: updateAvatar } = useUpdatePetAvatar();

  const { validate, getError, clearError } = usePetValidation({
    newPet: pet,
    isBirthDateUnknown,
    birthYear,
  });

  const hasChanges =
    JSON.stringify(pet) !== JSON.stringify(initialPet) || image !== null;

  const {
    isUnsavedOpen,
    setIsUnsavedOpen,
    attemptNavigation,
    discardChangesAndNavigate,
  } = useUnsavedChanges({ hasChanges });

  useEffect(() => {
    if (!data) return;

    setPet(data);
    setInitialPet(data);
    if (!initialSnapshotRef.current) {
      initialSnapshotRef.current = JSON.stringify(data);
    }
    setSelected(data.birthDate ? new Date(data.birthDate) : undefined);
  }, [data]);

  const handleSave = async () => {
    if (!validate() || !pet.id) return;

    const birthDate = petBirthDate({
      birthDate: pet.birthDate,
      birthYear,
      birthMonth,
    });

    const updatedPet: Pet = {
      id: pet.id,
      name: pet.name!,
      petTypeName: pet.petTypeName!,
      breed: pet.breed!,
      genderTypeName: pet.genderTypeName!,
      weight: pet.weight!,
      birthDate,
      avatar: normalizeAvatar(pet.avatar),
      sterilized: pet.sterilized!,
      allergies: pet.allergies || [],
      checked: true,
    };

    updatePetMutate(
      { id: pet.id.toString(), pet: updatedPet },
      {
        onSuccess: async () => {
          let avatarUrl = pet.avatar;

          if (image?.file) {
            avatarUrl = await updateAvatar({
              petId: pet.id!.toString(),
              file: image.file,
            });
          }

          setPet((prev) => ({ ...prev, avatar: avatarUrl, birthDate }));
          router.push("/owner/pets?updated=1");
        },
        onError: (error) => {
          alert(error.message || "Помилка редагування профілю тварини");
        },
      },
    );
  };

  const handleCancel = () => {
    if (!initialPet) return;
    setPet(initialPet);
    setImage(null);
    setSelected(
      initialPet.birthDate ? new Date(initialPet.birthDate) : undefined,
    );
  };

  return {
    pet,
    setPet,
    initialPet,
    image,
    setImage,
    selected,
    setSelected,
    isOpenCalendar,
    setIsOpenCalendar,
    showAvatarSuccess,
    setShowAvatarSuccess,
    isBirthDateUnknown,
    setIsBirthDateUnknown,
    birthMonth,
    setBirthMonth,
    birthYear,
    setBirthYear,
    validate,
    getError,
    clearError,
    isLoading,
    handleSave,
    handleCancel,
    isUnsavedOpen,
    setIsUnsavedOpen,
    attemptNavigation,
    discardChangesAndNavigate,
  };
}

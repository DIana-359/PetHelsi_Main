import { useEditPetForm } from "./useEditPetForm";
import { usePetBirthDate } from "./usePetBirthDate";
import { useGetPetById } from "./useGetPetById";
import { useUnsavedChanges } from "./useUnsavedChanges";
import { usePetAvatar } from "./usePetAvatar";
import { usePetSubmit } from "./usePetSubmit";
import { useState } from "react";
import { PetFormValues } from "@/utils/schemas/pet.schemas";

export function useEditPetPage(petId: string) {
  const { data, isLoading } = useGetPetById(petId);

  const form = useEditPetForm(data);
  const avatar = usePetAvatar();
  const birth = usePetBirthDate(data);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    reset,
    formState: { isDirty },
  } = form;

  const hasChanges = isDirty || avatar.image !== null;
  const unsaved = useUnsavedChanges({ hasChanges });

  const { onSubmit } = usePetSubmit({
    petId,
    image: avatar.image,
    reset,
    birthMonth: birth.birthMonth,
    birthYear: birth.birthYear,
    onError: setErrorMessage,
    onAvatarUploadSuccess: () => avatar.setShowAvatarSuccess(true),
  });

  const handleCancel = () => {
    if (!data) return;

    reset({
      name: data.name,
      petTypeName: data.petTypeName,
      breed: data.breed || "",
      genderTypeName: data.genderTypeName as PetFormValues["genderTypeName"],
      weight: data.weight,
      sterilized: data.sterilized,
      allergies: data.allergies || [],
      birthDate: data.birthDate || "",
    });

    avatar.setImage(null);
    birth.setSelected(data.birthDate ? new Date(data.birthDate) : undefined);
  };

  return {
    form,
    avatar,
    unsaved,
    initialPet: data,
    isLoading,
    onSubmit,
    handleCancel,
    errorMessage,
    setErrorMessage,
  };
}

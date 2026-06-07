import { PetFormValues } from "@/utils/schemas/pet.schemas";
import { useRouter } from "next/navigation";
import { useUpdatePet } from "./useUpdatePet";
import { useUpdatePetAvatar } from "./useUpdatePetAvatar";
import { petBirthDate } from "@/utils/petBirthDate/petBirthDate";
import { Pet } from "@/types/pet";

interface UsePetSubmitProps {
  petId: string;
  image: { preview: string; file: File } | null;
  reset: (values: PetFormValues) => void;
  birthMonth?: string;
  birthYear?: string;
  onAvatarUploadSuccess?: () => void;
  onError?: (message: string) => void;
}

export function usePetSubmit({
  petId,
  image,
  reset,
  birthMonth,
  birthYear,
  onAvatarUploadSuccess,
  onError,
}: UsePetSubmitProps) {
  const router = useRouter();
  const { mutate: updatePetMutate } = useUpdatePet();
  const { mutateAsync: updateAvatar } = useUpdatePetAvatar({
    onSuccess: onAvatarUploadSuccess,
  });

  const onSubmit = async (formData: PetFormValues) => {
    if (!petId) return;

    const birthDate =
      petBirthDate({
        birthDate: formData.birthDate,
        birthYear,
        birthMonth,
      }) ?? "";

    const updatedPet: Pet = {
      id: Number(petId),
      ...formData,
      birthDate,
      allergies: formData.allergies || [],
      checked: true,
    };

    updatePetMutate(
      { id: petId, pet: updatedPet },
      {
        onSuccess: async () => {
          if (image?.file) {
            await updateAvatar({
              petId,
              file: image.file,
            });
          }

          reset({
            ...formData,
            birthDate,
          });

          router.push("/owner/pets?updated=1");
        },
        onError: (error) => {
          const message =
            error instanceof Error
              ? error.message
              : "Помилка редагування профілю тварини";
          onError?.(message);
        },
      },
    );
  };

  return { onSubmit };
}

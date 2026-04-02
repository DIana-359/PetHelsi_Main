import { PetFormValues } from "@/utils/schemas/pet.schemas";
import { useRouter } from "next/navigation";
import { useUpdatePet } from "./useUpdatePet";
import { useUpdatePetAvatar } from "./useUpdatePetAvatar";
import { petBirthDate } from "@/utils/petBirthDate/petBirthDate";
import { Pet } from "@/types/pet";

export function usePetSubmit({
  petId,
  image,
  reset,

  birthMonth,
  birthYear,
}: {
  petId: string;
  image: { preview: string; file: File } | null;
  reset: (values: PetFormValues) => void;
  birthMonth?: string;
  birthYear: string;
}) {
  const router = useRouter();
  const { mutate: updatePetMutate } = useUpdatePet();
  const { mutateAsync: updateAvatar } = useUpdatePetAvatar();

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
          alert(error.message || "Помилка редагування профілю тварини");
        },
      },
    );
  };

  return { onSubmit };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePetAvatar } from "@/services/pets/updatePetAvatar";
import { Pet } from "@/types/pet";

interface UpdatePetAvatarInput {
  petId: string;
  file: File;
}

export function useUpdatePetAvatar() {
  const queryClient = useQueryClient();

  return useMutation<string, unknown, UpdatePetAvatarInput>({
    mutationFn: async ({ petId, file }) => {
      const publicUrl = await updatePetAvatar(petId, file);
      // зберігаємо лише відносний шлях
      return publicUrl.replace(
        "https://pet-helsi.s3.eu-north-1.amazonaws.com/",
        "",
      );
    },
    onSuccess: (relativeUrl, { petId }) => {
      queryClient.setQueryData<Pet | undefined>(["pet", petId], (old) =>
        old ? { ...old, avatar: relativeUrl } : old,
      );
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
}

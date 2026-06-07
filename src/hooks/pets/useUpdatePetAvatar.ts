import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePetAvatar } from "@/services/pets/updatePetAvatar";
import { Pet } from "@/types/pet";

interface UpdatePetAvatarInput {
  petId: string;
  file: File;
}

interface UseUpdatePetAvatarOptions {
  onSuccess?: () => void;
}

export function useUpdatePetAvatar(options?: UseUpdatePetAvatarOptions) {
  const queryClient = useQueryClient();

  return useMutation<string, Error, UpdatePetAvatarInput>({
    mutationFn: ({ petId, file }) => updatePetAvatar(petId, file),

    onSuccess: (relativeUrl, { petId }) => {
      queryClient.setQueryData<Pet | undefined>(["pet", petId], (old) =>
        old ? { ...old, avatar: relativeUrl } : old,
      );

      queryClient.invalidateQueries({ queryKey: ["pets"] });
      options?.onSuccess?.();
    },
  });
}

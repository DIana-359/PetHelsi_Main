import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePetAvatar } from "@/services/pets/updatePetAvatar";
import { Pet } from "@/types/pet";
import { queryKeys } from "@/lib/queryKeys";

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
      queryClient.setQueryData<Pet | undefined>(
        queryKeys.pets.detail(petId),
        (old) => (old ? { ...old, avatar: relativeUrl } : old),
      );

      queryClient.invalidateQueries({ queryKey: queryKeys.pets.all });
      options?.onSuccess?.();
    },
  });
}

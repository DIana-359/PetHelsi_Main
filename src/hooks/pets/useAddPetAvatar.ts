import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPetAvatar } from "@/services/pets/addPetAvatar";

interface AddPetAvatarInput {
  petId: string;
  file: File;
}

export function useAddPetAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ petId, file }: AddPetAvatarInput) => {
      const result = await addPetAvatar(petId, file);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.publicUrl ?? null;
    },

    onSuccess: (_publicUrl, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["pet", variables.petId],
      });

      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });
    },
  });
}

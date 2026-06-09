import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPetAvatar } from "@/services/pets/addPetAvatar";
import { queryKeys } from "@/lib/queryKeys";

interface AddPetAvatarInput {
  petId: string;
  file: File;
}

export function useAddPetAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ petId, file }: AddPetAvatarInput) => {
      const { error } = await addPetAvatar(petId, file);
      if (error) throw new Error(error);

      return petId;
    },

    onSuccess: (petId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets.detail(petId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.pets.all });
    },
  });
}

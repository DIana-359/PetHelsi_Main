import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePet } from "@/services/pets/updatePet";
import { Pet } from "@/types/pet";
import { queryKeys } from "@/lib/queryKeys";

export function useUpdatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, pet }: { id: string; pet: Pet }) => updatePet(id, pet),

    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.pets.detail(id) });
    },
  });
}

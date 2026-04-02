import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePet } from "@/services/pets/updatePet";
import { Pet } from "@/types/pet";

export function useUpdatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, pet }: { id: string; pet: Pet }) => updatePet(id, pet),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
}

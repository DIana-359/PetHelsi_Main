import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePet } from "@/services/pets/deletePet";

export function useDeletePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePet(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });

      queryClient.removeQueries({ queryKey: ["pet", id] });
    },
  });
}

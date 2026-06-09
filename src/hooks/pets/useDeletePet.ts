import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePet } from "@/services/pets/deletePet";
import { queryKeys } from "@/lib/queryKeys";

export function useDeletePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePet(id),

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets.all });

      queryClient.removeQueries({ queryKey: queryKeys.pets.detail(id) });
    },
  });
}

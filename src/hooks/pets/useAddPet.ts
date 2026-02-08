import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPet } from "@/services/pets/addPet";

export function useAddPet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPet,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });
}

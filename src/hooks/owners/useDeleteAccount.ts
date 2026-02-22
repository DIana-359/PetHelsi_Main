import { deleteAccount } from "@/services/owners/deleteAccount";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccount,

    onSuccess: () => {
      queryClient.clear();
    },
  });
}
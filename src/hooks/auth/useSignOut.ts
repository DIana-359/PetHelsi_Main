import { signOut } from "@/services/auth/signOut";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signOut,

    onSuccess: async () => {
      queryClient.clear();
      queryClient.cancelQueries();
    },
  });
}

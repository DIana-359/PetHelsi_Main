"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn } from "@/services/auth/signIn";
import { queryKeys } from "@/lib/queryKeys";

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signIn,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.profile,
      });
    },
  });
}

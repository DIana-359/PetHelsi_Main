import { useMutation } from "@tanstack/react-query";
import { signUp } from "@/services/auth/signUp";
import { signIn } from "@/services/auth/signIn";

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,

    onSuccess: async (_, variables) => {
      await signIn({
        email: variables.email,
        password: variables.password,
      });
    },
  });
}

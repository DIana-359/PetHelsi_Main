import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/owners/changePassword";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
  });
}

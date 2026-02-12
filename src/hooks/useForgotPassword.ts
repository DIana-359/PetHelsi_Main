import { useMutation } from "@tanstack/react-query";
import { getNewPassword } from "@/services/forgotPassword";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: getNewPassword,
  });
};
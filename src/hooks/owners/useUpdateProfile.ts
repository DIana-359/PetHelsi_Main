import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProfile from "@/services/owners/updateProfile";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (data) => {
      queryClient.setQueryData(["profile"], data);
    },
  });
}

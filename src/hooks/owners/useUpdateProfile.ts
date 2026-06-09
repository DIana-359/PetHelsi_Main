import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProfile from "@/services/owners/updateProfile";
import { queryKeys } from "@/lib/queryKeys";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.profile, data);
    },
  });
}

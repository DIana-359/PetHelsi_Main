import { useQuery } from "@tanstack/react-query";
import { getProfileClient } from "@/services/auth/getProfile.client";
import { queryKeys } from "@/lib/queryKeys";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: getProfileClient,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
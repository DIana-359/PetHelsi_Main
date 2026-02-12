import { useQuery } from "@tanstack/react-query";
import { getProfileClient } from "@/services/auth/getProfile.client";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfileClient,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
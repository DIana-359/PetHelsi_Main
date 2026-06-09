import { getProfileSSR } from "@/services/auth/getProfile.server";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export async function fetchProfileAndDehydrate() {
  const queryClient = getQueryClient();
  const profile = await getProfileSSR();
  queryClient.setQueryData(queryKeys.profile, profile);
  return { queryClient, profile, dehydratedState: dehydrate(queryClient) };
}
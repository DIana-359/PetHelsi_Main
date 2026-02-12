import { getProfileSSR } from "@/services/auth/getProfile.server";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";

export async function fetchProfileAndDehydrate() {
  const queryClient = getQueryClient();
  const profile = await getProfileSSR();
  queryClient.setQueryData(["profile"], profile);
  return { queryClient, profile, dehydratedState: dehydrate(queryClient) };
}
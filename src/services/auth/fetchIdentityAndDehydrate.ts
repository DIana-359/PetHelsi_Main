import { cookies } from "next/headers";
import { getProfileSSR } from "@/services/auth/getProfile.server";
import { getDoctorProfileSSR } from "@/services/doctors/getDoctorProfile.server";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export async function fetchIdentityAndDehydrate() {
  const queryClient = getQueryClient();
  const hasToken = Boolean((await cookies()).get("auth-token")?.value);

  const owner = await getProfileSSR();
  queryClient.setQueryData(queryKeys.profile, owner);

  const doctor = hasToken && !owner ? await getDoctorProfileSSR() : null;
  queryClient.setQueryData(queryKeys.doctorProfile, doctor);

  return { queryClient, owner, doctor, dehydratedState: dehydrate(queryClient) };
}

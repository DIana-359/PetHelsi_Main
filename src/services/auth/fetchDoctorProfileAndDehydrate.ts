import { getDoctorProfileSSR } from "@/services/doctors/getDoctorProfile.server";
import { getQueryClient } from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";

export async function fetchDoctorProfileAndDehydrate() {
  const queryClient = getQueryClient();
  const doctor = await getDoctorProfileSSR();
  queryClient.setQueryData(queryKeys.doctorProfile, doctor);
  return { queryClient, doctor, dehydratedState: dehydrate(queryClient) };
}

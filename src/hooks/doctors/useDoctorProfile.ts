import { useQuery } from "@tanstack/react-query";
import { getDoctorProfileClient } from "@/services/doctors/getDoctorProfile.client";
import { queryKeys } from "@/lib/queryKeys";

export function useDoctorProfile() {
  return useQuery({
    queryKey: queryKeys.doctorProfile,
    queryFn: getDoctorProfileClient,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

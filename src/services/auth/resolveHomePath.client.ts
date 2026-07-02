import { getDoctorProfileClient } from "@/services/doctors/getDoctorProfile.client";

export async function resolveHomePath(): Promise<string> {
  const doctor = await getDoctorProfileClient();
  return doctor ? "/vet/profile" : "/owner/profile";
}

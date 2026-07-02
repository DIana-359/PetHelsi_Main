import { apiFetch } from "@/lib/apiFetch.client";

export async function getDoctorProfileClient() {
  const res = await apiFetch("/api/proxy/get-doctor-profile");

  if (!res.ok) return null;
  return res.json();
}

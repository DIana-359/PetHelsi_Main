import { apiFetch } from "@/lib/apiFetch.client";

export async function getProfileClient() {
  const res = await apiFetch("/api/proxy/get-profile");

  if (!res.ok) return null;
  return res.json();
}
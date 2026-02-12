import { apiFetch } from "@/lib/apiFetch.client";

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
};

export async function changePassword(payload: ChangePasswordPayload) {
  const res = await apiFetch("/api/ownerProfile/change-password", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to change password");
  }

  return res.json();
}

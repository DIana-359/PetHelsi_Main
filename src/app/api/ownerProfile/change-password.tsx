"use client";

export default async function changePassword(listPass: {
  oldPassword: string | undefined;
  newPassword: string | undefined;
  repeatNewPassword: string | undefined;
}) {
  const res = await fetch("/api/ownerProfile/change-password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listPass),
  });

  if (!res.ok) {
    throw new Error(`Failed to change password: ${res.status}`);
  }

  return await res.json();
}

"use client";

export default async function updateProfile(formData: {
  lastName: string | null;
  firstName: string | null;
  middleName: string | null;
  phone: string | null;
  birthday: string | null;
  city: string | null;
}) {
  const res = await fetch("/api/ownerProfile/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    throw new Error(`Failed to update profile: ${res.status}`);
  }

  return await res.json();
}

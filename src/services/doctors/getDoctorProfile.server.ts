import { cookies } from "next/headers";

export async function getDoctorProfileSSR() {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/proxy/get-doctor-profile`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

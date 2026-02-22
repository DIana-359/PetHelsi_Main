import { cookies } from "next/headers";

export async function getProfileSSR() {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.API_URL}/v1/owners/profile`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

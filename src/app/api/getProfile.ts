export async function getProfileSSR(token: string) {
  console.log("API URL (SSR):", process.env.API_URL);
  console.log("Client API URL:", process.env.NEXT_PUBLIC_BASE_URL);
  const res = await fetch(`${process.env.API_URL}/v1/owners/profile`, {
    headers: {
      Accept: "application/json",
      Cookie: `auth-token=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function getProfileClient() {
  const res = await fetch("/api/proxy/get-profile", {
    credentials: "include",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function getProfileSSR(token: string) {
  const res = await fetch(
    "https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/v1/owners/profile",
    {
      headers: {
        Accept: "application/json",
        Cookie: `auth-token=${token}`,
      },
      cache: "no-store",
    }
  );

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

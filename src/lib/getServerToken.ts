import { cookies } from "next/headers";
import { headers } from "next/headers";

export async function getServerToken(): Promise<string | null> {
  const headersList = await headers();
  const fromHeader = headersList.get("x-auth-token");
  if (fromHeader) return fromHeader;

  const cookieStore = await cookies();
  return cookieStore.get("auth-token")?.value ?? null;
}
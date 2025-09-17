import { cookies } from "next/headers";

export async function checkToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  return token;
}

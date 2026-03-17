import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("auth-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;

  if (!accessToken) {
    return NextResponse.json(null, { status: 200 });
  }

  const doFetch = async (token: string) => {
    return fetch(`${process.env.API_URL}/v1/owners/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  };

  const res = await doFetch(accessToken);

  if (res.status !== 401) {
    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }

    return NextResponse.json(await res.json());
  }

  if (!refreshToken) {
    return NextResponse.json(null, { status: 401 });
  }

  const refreshRes = await fetch(
    `${process.env.API_URL}/v1/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }
  );

  if (!refreshRes.ok) {
    const response = NextResponse.json(null, { status: 401 });
    response.cookies.delete("auth-token");
    response.cookies.delete("refresh-token");
    return response;
  }

  const data = await refreshRes.json();

  const retry = await doFetch(data.accessToken);

  const finalResponse = NextResponse.json(await retry.json());

  finalResponse.cookies.set("auth-token", data.accessToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return finalResponse;
}
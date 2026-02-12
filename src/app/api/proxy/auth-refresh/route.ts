import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh-token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: "No refresh token" },
      { status: 401 }
    );
  }

  const res = await fetch(`${process.env.API_URL}/v1/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!res.ok) {
    const response = NextResponse.json(
      { error: "Refresh failed" },
      { status: 401 }
    );

    response.cookies.delete("auth-token");
    response.cookies.delete("refresh-token");

    return response;
  }

  const data = await res.json();

  const response = NextResponse.json({ ok: true, accessToken: data.accessToken });

  response.cookies.set("auth-token", data.accessToken, {
    httpOnly: true,
    // secure: true, // Set `secure: true` when deploying over HTTPS.
    sameSite: "lax",
    path: "/",
  });

  return response;
}

import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {

  const refreshToken = req.cookies.get("refresh-token")?.value;

  if (!refreshToken) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get("auth-token")?.value;

  if (!accessToken) {
    try {
      const apiRes = await fetch(`${process.env.API_URL}/v1/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!apiRes.ok) {
        const res = NextResponse.next();
        res.cookies.delete("auth-token");
        res.cookies.delete("refresh-token");
        return res;
      }

      const data = await apiRes.json();

      const res = NextResponse.next();
      res.cookies.set("auth-token", data.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });

      return res;
    } catch {
      const res = NextResponse.next();
      res.cookies.delete("auth-token");
      res.cookies.delete("refresh-token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|api/proxy/auth-refresh).*)",
  ],
};
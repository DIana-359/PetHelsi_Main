import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { code, role } = await request.json();

    const backendResponse = await fetch(
      `${process.env.API_URL}/v1/auth/exchange`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, role }),
        credentials: "include",
      }
    );

    if (!backendResponse.ok) {
      const text = await backendResponse.text();
      throw new Error(`Backend exchange failed: ${text}`);
    }

    const data = await backendResponse.json();

    const response = NextResponse.json(data);

    const backendCookies = backendResponse.headers.get("set-cookie");
    if (backendCookies) {
      backendCookies.split(",").forEach(cookie => {
        const cleanedCookie = cookie
          .replace(/; Domain=[^;]+/i, "")
          .replace(/; Secure/gi, "");
        response.headers.append("Set-Cookie", cleanedCookie);
      });
    }

    return response;
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Exchange failed" }, { status: 401 });
  }
}

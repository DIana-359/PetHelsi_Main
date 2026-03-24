import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const backendResponse = await fetch(
      `${process.env.API_URL}/v1/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!backendResponse.ok) {
      throw new Error("Backend login failed");
    }

    const data = await backendResponse.json();

    const { accessToken, refreshToken, id } = data;

    const response = NextResponse.json(data);

    response.cookies.set("auth-token", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      // secure: true, // enable for production (https)
    });

    response.cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      // secure: true, // enable for production (https)
    });

    response.cookies.set("user-id", String(id), {
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 401 });
  }
}
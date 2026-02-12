import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const token = (await cookies()).get("auth-token");

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const backendRes = await fetch(
      `${process.env.API_URL}/v1/owners/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await backendRes.json().catch(() => ({}));

    const response = NextResponse.json(data, {
      status: backendRes.status,
    });

    if (backendRes.ok) {
      if (data.accessToken) {
        response.cookies.set("auth-token", data.accessToken, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          // secure: true, // Set `secure: true` when deploying over HTTPS.
        });
      }

      if (data.refreshToken) {
        response.cookies.set("refresh-token", data.refreshToken, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          // secure: true, // Set `secure: true` when deploying over HTTPS.
        });
      }
    }

    return response;
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

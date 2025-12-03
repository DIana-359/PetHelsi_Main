import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE() {
  try {
    const token = (await cookies()).get("auth-token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${process.env.API_URL}/v1/owners`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (res.status === 204) {
      const response = new NextResponse(null, { status: 204 });
      response.cookies.set("auth-token", "", { path: "/", maxAge: 0 });
      return response;
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Delete account error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

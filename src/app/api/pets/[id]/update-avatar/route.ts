import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const token = (await cookies()).get("auth-token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const res = await fetch(
      `${process.env.API_URL}/v1/owners/pets/${id}/avatars`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
        body: formData,
      },
    );

    if (res.status === 204) {
      return NextResponse.json(null, { status: 204 });
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Upload pet avatar error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("auth-token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const petId = req.nextUrl.searchParams.get("petId");
    if (!petId) {
      return NextResponse.json(
        { message: "petId query parameter is required" },
        { status: 400 },
      );
    }

    const formData = await req.formData();

    const res = await fetch(
      `${process.env.API_URL}/v1/owners/pets/${petId}/avatars`,
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    );

    const data = await res.json();

    if (data?.publicUrl && !data.publicUrl.startsWith("http")) {
      data.publicUrl = `${process.env.API_URL}${data.publicUrl}`;
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Add pet avatar error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

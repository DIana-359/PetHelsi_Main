import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Pet } from "@/app/types/pet";

export async function POST(req: NextRequest) {
  try {
    const token = (await cookies()).get("auth-token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body: Pet = await req.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/owners/pets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Add pet error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

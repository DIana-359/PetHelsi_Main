import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deletePetServer } from "@/app/services/deletePet.server";

export async function DELETE(req: NextRequest) {
  try {
    const token = (await cookies()).get("auth-token");
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const petId = searchParams.get("id");

    if (!petId) {
      return NextResponse.json(
        { message: "Pet ID is required" },
        { status: 400 }
      );
    }

    // Викликаємо server-сервіс (він робить upstream fetch)
    const result = await deletePetServer(petId, token.value);

    if (result.ok) {
      // Якщо upstream повернув 204 — повертаємо 204 без тіла
      return new NextResponse(null, { status: 204 });
    }

    // Якщо upstream повернув помилку — проксуємо статус і повідомлення
    return NextResponse.json(
      { message: result.error ?? "Delete failed" },
      { status: result.status ?? 500 }
    );
  } catch (err) {
    console.error("API delete-pet error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

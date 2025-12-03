import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const backendUrl = new URL(`${process.env.API_URL}/v1/vets`);
  searchParams.forEach((value, key) => {
    backendUrl.searchParams.append(key, value);
  });

  try {
    const res = await fetch(backendUrl.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Помилка fetch vets:", err);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}

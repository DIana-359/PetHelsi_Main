import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "No auth token" }), {
        status: 401,
      });
    }
    const body = await request.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/owners/history/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      return new Response(
        JSON.stringify({
          error: `Failed to update complaint. Status: ${response.status}`,
          details: errorBody,
        }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

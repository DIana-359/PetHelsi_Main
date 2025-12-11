import { cookies } from "next/headers";

export async function GET(request: Request) {
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

    const response = await fetch(
      `${process.env.API_URL}/v1/owners/history/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      return new Response(
        JSON.stringify({
          error: `Failed to fetch history. Status: ${response.status}`,
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

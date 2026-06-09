import { NextResponse } from "next/server";
import { withAuth, backendFetch } from "@/lib/proxyHandler";

export const POST = withAuth(async ({ req, token }) => {
  const { searchParams } = new URL(req.url);
  const vetId = searchParams.get("vetId");
  const slotId = searchParams.get("slotId");

  if (!vetId || !slotId) {
    return NextResponse.json(
      { message: "Missing vetId or slotId parameter" },
      { status: 400 },
    );
  }

  const res = await backendFetch(
    `/v1/owners/vets/${vetId}/schedule-slots/${slotId}/hold`,
    token,
    { method: "POST" },
  );

  if (!res.ok) {
    const errorData = await res
      .json()
      .catch(() => ({ message: "Hold slot failed" }));
    return NextResponse.json(
      { message: errorData.message || "Hold slot failed" },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
});

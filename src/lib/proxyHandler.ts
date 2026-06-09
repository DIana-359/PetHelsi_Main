import { NextRequest, NextResponse } from "next/server";
import { getServerToken } from "@/lib/getServerToken";

type RouteContext<P> = { params: Promise<P> };

/**
 * Wraps an authenticated proxy route handler: resolves the bearer token via
 * {@link getServerToken} (proxy-refreshed `x-auth-token` header, then
 * `auth-token` cookie), returns 401 if absent, awaits dynamic-route params, and
 * turns thrown errors into 500.
 */
export function withAuth<P = Record<string, string>>(
  handler: (args: {
    token: string;
    req: NextRequest;
    params: P;
  }) => Promise<Response> | Response,
) {
  return async (
    req: NextRequest,
    context?: RouteContext<P>,
  ): Promise<Response> => {
    try {
      const token = await getServerToken();
      if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      // Non-dynamic routes carry no `context`; `as P` is needed because the
      // compiler can't prove `{}` satisfies an open generic `P`.
      const params = context ? await context.params : ({} as P);
      return await handler({ token, req, params });
    } catch (err) {
      console.error("API route error:", err);
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 },
      );
    }
  };
}

/**
 * Calls the external backend with the bearer token attached. Sets `Accept` and,
 * for string bodies, `Content-Type` to JSON; leaves FormData untouched so
 * `fetch` sets the multipart boundary.
 */
export function backendFetch(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (typeof init.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${process.env.API_URL}${path}`, { ...init, headers });
}

/** Mirrors a backend JSON response (status + body), tolerating empty / 204. */
export async function forwardJson(res: Response): Promise<NextResponse> {
  if (res.status === 204) {
    return NextResponse.json(null, { status: 204 });
  }
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

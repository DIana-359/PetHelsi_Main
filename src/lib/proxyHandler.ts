import { NextRequest, NextResponse } from "next/server";
import { getServerToken } from "@/lib/getServerToken";

type RouteContext<P> = { params: Promise<P> };

/**
 * Wraps an authenticated proxy route handler.
 *
 * - Resolves the bearer token via {@link getServerToken}, which prefers the
 *   `x-auth-token` header refreshed by the proxy middleware and falls back to
 *   the `auth-token` cookie. This is the single source of truth for the token
 *   across all routes, so a token just refreshed by the middleware is used.
 * - Returns `401` when no token is present.
 * - Awaits and forwards the dynamic route `params` to the handler.
 * - Converts any thrown error into a `500`.
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

      // For dynamic routes Next passes `context.params` (a Promise we await).
      // For non-dynamic routes there is no `context`, so we substitute an empty
      // object. The `as P` is unavoidable here: `P` is an open generic, so the
      // compiler can't prove `{}` is assignable to every possible `P` — but at
      // runtime this branch only runs for routes that have no params.
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
 * Calls the external backend with the bearer token attached.
 *
 * The `Accept: application/json` header is added by default, and
 * `Content-Type: application/json` is set automatically for string bodies.
 * FormData (and other non-string) bodies are left untouched so `fetch` can set
 * the correct multipart boundary.
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

/**
 * Mirrors a backend JSON response (status + body) back to the client,
 * tolerating empty / `204 No Content` responses.
 */
export async function forwardJson(res: Response): Promise<NextResponse> {
  if (res.status === 204) {
    return NextResponse.json(null, { status: 204 });
  }
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

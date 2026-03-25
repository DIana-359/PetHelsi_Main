let refreshPromise: Promise<Response> | null = null;
let lastRefreshTime = 0;

const REFRESH_INTERVAL = 4 * 60 * 1000;

async function refreshToken() {
  if (!refreshPromise) {
    refreshPromise = fetch("/api/proxy/auth-refresh", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function apiFetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {

  if (refreshPromise) {
    await refreshPromise;
  }

  if (Date.now() - lastRefreshTime > REFRESH_INTERVAL) {
    const refreshRes = await refreshToken();

    if (refreshRes.ok) {
      lastRefreshTime = Date.now();
    }
  }

  let res = await fetch(input, {
    ...init,
    credentials: "include",
  });

  if (res.status === 401) {
    const refreshRes = await refreshToken();

    if (!refreshRes.ok) {
      window.location.href = "/signin";
      throw new Error("Session expired");
    }

    lastRefreshTime = Date.now();

    res = await fetch(input, {
      ...init,
      credentials: "include",
    });
  }

  return res;
}
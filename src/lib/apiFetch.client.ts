let refreshPromise: Promise<Response> | null = null;

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

    res = await fetch(input, {
      ...init,
      credentials: "include",
    });
  }

  return res;
}
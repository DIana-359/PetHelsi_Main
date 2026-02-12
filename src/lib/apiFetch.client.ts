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

  const res = await refreshPromise;
  if (!res.ok) {
    window.location.href = "/signin";
    throw new Error("Session expired");
  }
  return res;
}

export async function apiFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
  let res = await fetch(input, { ...init, credentials: "include" });

  if (res.status !== 401) return res;

  await refreshToken();

  res = await fetch(input, { ...init, credentials: "include" });
  if (res.status === 401) {
    window.location.href = "/signin";
    throw new Error("Session expired after refresh");
  }

  return res;
}

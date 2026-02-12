export const getNewPassword = async (email: string): Promise<number> => {
  const res = await fetch("/api/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (res.status === 400) {
    throw new Error("INVALID_EMAIL");
  }

  if (res.status === 500) {
    throw new Error("EMAIL_SERVICE_UNAVAILABLE");
  }

  if (!res.ok) {
    throw new Error("UNKNOWN_ERROR");
  }

  return res.status;
};

type SignInPayload = {
  email: string;
  password: string;
};

export async function signIn(payload: SignInPayload) {
  const response = await fetch("/api/proxy/login-cookie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  return response.json();
}

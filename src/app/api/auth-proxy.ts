type SigninPayload = {
  email: string;
  password: string;
};

export const fetchSigninCookieProxy = async ({
  email,
  password,
}: SigninPayload) => {
  const response = await fetch("/api/proxy/login-cookie", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  const data = await response.json();
 console.log(data)

  return data;
};

export const fetchSignoutCookieProxy = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const response = await fetch("/api/proxy/logout-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

    if (typeof window !== "undefined") {
      window.location.href = "/";
    }

    return {
      success: true,
      message: data.message || "Successfully logged out",
    };
  } catch (error) {
    console.error(
      "Logout failed:",
      error instanceof Error ? error.message : error
    );

    return {
      success: false,
      message: error instanceof Error ? error.message : "Logout failed",
    };
  }
};

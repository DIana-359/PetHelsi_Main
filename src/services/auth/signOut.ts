export const signOut = async (): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const response = await fetch("/api/proxy/logout-cookie",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();

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
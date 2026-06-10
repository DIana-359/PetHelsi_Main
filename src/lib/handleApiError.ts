export async function extractErrorMessage(
  res: Response,
  fallback = "Request failed",
): Promise<string> {
  try {
    const text = await res.text();
    return text || fallback;
  } catch {
    return fallback;
  }
}

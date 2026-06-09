/** Reads the error text from a failed `Response`, or `fallback` if empty/unreadable. */
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

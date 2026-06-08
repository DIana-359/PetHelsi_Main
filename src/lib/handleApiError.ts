/**
 * Reads an error message from a failed `Response` body, tolerating empty or
 * unreadable bodies. Returns `fallback` when nothing usable is found.
 *
 * Centralises the `await res.text()` boilerplate repeated across service
 * functions that surface backend error text to the caller.
 */
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

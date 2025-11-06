const safeParseArray = <T>(raw: string | null): T[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
  } catch (e) {
    console.warn("safeParseArray parse error", e);
    return [];
  }
};

export const readLocalArray = <T>(key: string): T[] => {
  return safeParseArray<T>(localStorage.getItem(key));
};

export const writeLocalArray = <T>(key: string, arr: T[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (e) {
    console.warn(`Failed to write ${key}`, e);
  }
};

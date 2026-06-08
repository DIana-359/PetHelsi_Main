export function petBirthDate({
  birthDate,
  birthYear,
  birthMonth,
}: {
  birthDate?: string;
  birthYear?: string;
  birthMonth?: string;
}): string | undefined {
  if (birthDate) return birthDate;
  if (!birthYear) return undefined;
  return birthMonth
    ? `${birthYear}-${birthMonth.padStart(2, "0")}-01`
    : `${birthYear}-01-01`;
}

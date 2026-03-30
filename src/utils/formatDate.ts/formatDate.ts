export const formatDateISO = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
};

export const formatDateDisplay = (date: Date) => {
  return `${String(date.getDate()).padStart(2, "0")} / ${String(
    date.getMonth() + 1,
  ).padStart(2, "0")} / ${date.getFullYear()}`;
};

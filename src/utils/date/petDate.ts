export const formatBirthDateUA = (dateString?: string) => {
  if (!dateString) return "Не вказано";

  const [year, month, day] = dateString.split("-");

  if (month === "01" && day === "01") {
    return year;
  }

  if (day === "01") {
    const date = new Date(Number(year), Number(month) - 1);
    return new Intl.DateTimeFormat("uk-UA", {
      month: "long",
      year: "numeric",
    })
      .format(date)
      .replace(/^./, (c) => c.toUpperCase())
      .replace(/\s?р\.?$/, "");
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Не вказано";

  const formatted = new Intl.DateTimeFormat("uk-UA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(/\s?р\.?$/, "")
    .replace(".", "");

  return formatted.replace(/(\s\p{L})/u, (match) => match.toUpperCase());
};

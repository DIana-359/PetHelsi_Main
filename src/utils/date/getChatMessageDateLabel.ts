import dayjs from "dayjs";
import "dayjs/locale/uk";

export const getChatMessageDateLabel = (dateStr: string): string => {
  const date = dayjs(dateStr).locale("uk");
  const today = dayjs().startOf("day");
  const yesterday = today.subtract(1, "day");

  if (date.isSame(today, "day")) {
    return "Сьогодні";
  }

  if (date.isSame(yesterday, "day")) {
    return "Вчора";
  }

  const currentYear = dayjs().year();

  if (date.year() === currentYear) {
    return date.format("D MMMM");
  }

  return date.format("D MMMM YYYY");
};
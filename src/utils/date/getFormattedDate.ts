import dayjs from "dayjs"
import "dayjs/locale/uk"

type DateFormatVariant = "default" | "short"

export const getFormattedDate = (dateStr: string, variant: DateFormatVariant = "default") => {
  const date = dayjs(dateStr).locale("uk")
  const today = dayjs().startOf("day")
  const tomorrow = today.add(1, "day")

  if (date.isSame(today, "day")) {
    return variant === "default"
      ? `Сьогодні, ${date.format("dd")}`
      : "Сьогодні"
  }

  if (date.isSame(tomorrow, "day")) {
    return variant === "default"
      ? `Завтра, ${date.format("dd")}`
      : "Завтра"
  }

  const formatted = date.format("D MMMM")
  const capitalized = formatted.charAt(0).toUpperCase() + formatted.slice(1)

  return capitalized
}
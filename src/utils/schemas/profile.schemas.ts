import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const profileSchema = z.object({
  lastName: z.string().min(1, { message: "Заповніть поле" }),
  firstName: z.string().min(1, { message: "Заповніть поле" }),
  middleName: z.string().optional(),
  phone: z
    .string()
    .min(1, { message: "Заповніть поле" })
    .superRefine((value, ctx) => {
      if (!value) return;

      const phone = parsePhoneNumberFromString(value, "UA");

      // Only Ukrainian numbers, in the international +380 form.
      if (phone?.isValid() && phone.country === "UA") {
        if (value.trim().startsWith("+")) return;
        ctx.addIssue({
          code: "custom",
          message: `Додайте код країни: ${phone.number}`,
        });
        return;
      }

      ctx.addIssue({
        code: "custom",
        message: "Введіть номер у форматі +380XXXXXXXXX",
      });
    }),
  birthday: z.string().optional(),
  city: z.string().min(1, { message: "Заповніть поле" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

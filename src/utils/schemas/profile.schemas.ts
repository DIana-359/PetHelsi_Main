import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const profileSchema = z.object({
  lastName: z.string().min(1, { message: "Заповніть поле" }),
  firstName: z.string().min(1, { message: "Заповніть поле" }),
  middleName: z.string().optional(),
  phone: z
    .string()
    .min(1, { message: "Заповніть поле" })
    .refine((value) => isValidPhoneNumber(value), {
      message: "Введіть коректний номер телефону",
    }),
  birthday: z.string().optional(),
  city: z.string().min(1, { message: "Заповніть поле" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

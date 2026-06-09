import { z } from "zod";
import { emailRegex, passwordRegex } from "@/utils/validation/validationAuth";

export const signUpSchema = z
  .object({
    email: z
      .string()
      .regex(emailRegex, { message: "Будь ласка, введіть коректний E-mail" }),
    password: z.string().regex(passwordRegex, {
      message:
        "Пароль має містити мінімум 7 символів: одну велику літеру і цифру",
    }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Паролі повинні співпадати",
    path: ["repeatPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

import { z } from "zod";

const birthDateSchema = z.string().refine(
  (val) => {
    if (!val) return false;
    const fullDate = /^\d{4}-\d{2}-\d{2}$/;
    const monthYear = /^\d{4}-\d{2}$/;
    const yearOnly = /^\d{4}$/;
    return fullDate.test(val) || monthYear.test(val) || yearOnly.test(val);
  },
  {
    message: "Заповніть поле",
  },
);

export const petSchema = z.object({
  name: z.string().min(1, { message: "Заповніть поле" }),

  petTypeName: z.string({ error: "Заповніть поле" }).min(1, {
    message: "Заповніть поле",
  }),

  breed: z.string().optional(),

  genderTypeName: z.enum(["Хлопчик", "Дівчинка"] as const, {
    message: "Заповніть поле",
  }),

  weight: z
    .number({
      error: "Заповніть поле",
    })
    .min(0.1, { message: "Вага повинна бути більше 0 кг" }),

  sterilized: z.boolean({
    error: "Заповніть поле",
  }),

  allergies: z.array(z.string()).optional(),

  birthDate: birthDateSchema,
});

export type PetFormValues = z.infer<typeof petSchema>;

import { z } from "zod";

export const profileSchema = z.object({
  gender: z.enum(["LAKILAKI", "PEREMPUAN"]).optional(),
  birthDate: z.date().optional(),
  birthPlace: z.string().optional(),
  age: z.number().int().optional(),
  phoneNumber: z
    .string()
    .transform((num) => num.toString())
    .optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;

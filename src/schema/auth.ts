import { z } from "zod";

export const InitialRegister = z.object({
  name: z
    .string()
    .min(3, { message: "username min length 3 characters" })
    .regex(/^[a-zA-Z0-9\s]*$/, {
      message: "Name can only contain letters, numbers and spaces",
    }),

  email: z.string().email({ message: "Email is Required" }),

  password: z
    .string()
    .min(8, { message: "password min length 8 characters" })
    .regex(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, {
      message: "Password contains invalid characters",
    }),
});

export type InitialDataRegister = z.infer<typeof InitialRegister>;
export type InitialDataLogin = Omit<InitialDataRegister, "email">;

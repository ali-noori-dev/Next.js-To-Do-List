import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .refine((value) => /[A-Z]/.test(value), {
        message: "Must contain at least one uppercase letter.",
        path: ["password"],
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "Must contain at least one lowercase letter",
        path: ["password"],
      })
      .refine((value) => /\d/.test(value), {
        message: "Must contain at least one digit",
        path: ["password"],
      })
      .refine((value) => /[\W_]/.test(value), {
        message: "Must contain at least one symbol",
        path: ["password"],
      }),
    password_confirmation: z.string(),
  })
  .refine(
    ({ password_confirmation, password }) => password_confirmation === password,
    {
      message: "Passwords do not match",
      params: {
        field: "password_confirmation",
      },
      path: ["password_confirmation"],
    }
  );

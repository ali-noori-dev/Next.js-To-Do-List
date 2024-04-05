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
    confirmPassword: z.string(),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match",
    params: {
      field: "confirmPassword",
    },
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

"use server";
import { signIn } from "@/auth";
import { z } from "zod";
import { register } from "./data";
import { isError } from "./utils";

const schema = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords do not match",
    params: {
      field: "confirmPassword",
    },
    path: ["confirmPassword"],
  });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("password_confirmation") as string;

    const validatedFields = schema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validatedFields.success)
      return validatedFields.error.flatten().fieldErrors;
    else {
      const payload = {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        password_confirmation: validatedFields.data.confirmPassword,
      };
      const result = await register(payload);
      if (result) {
        if (isError(result)) return result.errors;
        else await signIn("credentials", result);
      }
    }
  } catch (error) {
    return error as any;
  }
}

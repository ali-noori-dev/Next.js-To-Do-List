"use server";
import { signIn } from "@/auth";
import { authenticateUser, createAccount } from "./data";
import { loginSchema, signUpSchema } from "./schema";
import { isError } from "./utils";

export async function signUpAuthentication(
  prevState: string | undefined,
  formData: FormData
): Promise<any> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("password_confirmation") as string;

  const validatedFields = signUpSchema.safeParse({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!validatedFields.success)
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  else {
    const payload = {
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      password_confirmation: validatedFields.data.confirmPassword,
    };

    const result = await createAccount(payload);

    if (isError(result))
      return {
        status: "error",
        errors: result.errors,
      };
    else return { status: "success" };
  }
}

export async function loginAuthentication(
  prevState: string | undefined,
  formData: FormData
): Promise<any> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success)
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  else {
    const payload = {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    };

    const result = await authenticateUser(payload);

    if (isError(result))
      return {
        status: "error",
        errors: result.errors,
      };
    else
      await signIn("credentials", {
        ...result,
        redirectTo: "/",
      });
  }
}

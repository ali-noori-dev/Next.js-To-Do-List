"use server";
import { register } from "./data";
import { signUpSchema } from "./schema";
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

    const result = await register(payload);

    if (isError(result))
      return {
        status: "error",
        errors: result.errors,
      };
    else
      return {
        status: "success",
      };
  }
}

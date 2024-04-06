"use server";
import { signIn } from "@/auth";
import { authenticateUser, createAccount } from "./data";
import { loginSchema, signUpSchema } from "./schema";
import { isError } from "./utils";

export async function signUpAuthentication(
  prevState: string | undefined,
  formData: FormData
): Promise<any> {
  // Extract user sign-up information from form data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const password_confirmation = formData.get("password_confirmation") as string;

  // Validate user sign-up data using schema
  const validatedFields = signUpSchema.safeParse({
    name,
    email,
    password,
    password_confirmation,
  });

  // If validation fails, return error status and validation errors
  if (!validatedFields.success)
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  else {
    const result = await createAccount(validatedFields.data);

    // If there is an error during account creation, return error status and errors
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
  // Extract user login information from form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate user login data using schema
  const validatedFields = loginSchema.safeParse({ email, password });

  // If validation fails, return error status and validation errors
  if (!validatedFields.success)
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  else {
    // Authenticate user using validated login data
    const payload = {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    };

    const result = await authenticateUser(payload);

    // If there is an error during authentication, return error status and errors
    if (isError(result))
      return {
        status: "error",
        errors: result.errors,
      };
    else
      await signIn("credentials", {
        token: result.token,
        redirectTo: "/", // Redirect to home page after successful login
      });
  }
}

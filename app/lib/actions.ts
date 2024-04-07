"use server";
import { signIn } from "@/auth";
import { addTask, authenticateUser, createAccount } from "./data";
import { signUpSchema } from "./schema";
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
  const result = await authenticateUser({ email, password });

  // If there is an error during authentication, return error status
  if (isError(result)) return { status: "error" };
  else
    await signIn("credentials", {
      accessToken: result.token,
      redirectTo: "/", // Redirect to home page after successful login
    });
}

export async function handleAddTask(
  prevState: string | undefined,
  formData: FormData
): Promise<any> {
  // Extract user login information from form data
  const description = formData.get("description") as string;
  const result = await addTask({ description });
  console.log({ result });

  // If there is an error while adding the task, return error status
  if (isError(result)) return { status: "error" };
  else return { status: "success" };
}

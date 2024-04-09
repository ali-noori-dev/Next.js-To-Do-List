"use server";
import { signIn } from "@/auth";
import { TaskCompletionState } from "../ui/forms/task-completion-form";
import {
  addTask,
  authenticateUser,
  createAccount,
  deleteTask,
  editTask,
} from "./data";
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
  // Extract email and password from form data
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Authenticate the user using provided credentials
  const result = await authenticateUser({ email, password });

  // If authentication fails, return an error status
  if (isError(result)) return { status: "error" };
  else {
    // Sign in the user using credentials method and storing the access token
    await signIn("credentials", {
      accessToken: result.token,
      redirectTo: "/", // Redirect to home page after successful login
    });
  }
}

export async function handleAddTask(
  prevState: string | undefined,
  formData: FormData
): Promise<any> {
  const description = formData.get("description") as string;
  const result = await addTask({ description });
  if (isError(result)) return { status: "error" };
  else return { status: "success" };
}

export async function handleDeleteTask(prevState: string): Promise<any> {
  const result = await deleteTask(prevState);
  console.log({ result });
}

export async function handleUpdateTask(
  prevState: TaskCompletionState,
  formData: FormData
): Promise<any> {
  const completed = formData.get("completed") as string;
  const payload = { id: prevState.id, completed: !!completed };
  const result = await editTask(payload);
  if (isError(result)) return { status: "error", id: prevState.id };
  else return { status: "success", id: prevState.id };
}

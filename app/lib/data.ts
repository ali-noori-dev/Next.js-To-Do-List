import { auth } from "@/auth";
import {
  AuthenticateUserPayload,
  AuthenticateUserResult,
  CreateAccountPayload,
  CreateAccountResult,
  Task,
} from "../types/definitions";

interface PostRequestOptions {
  endPoint: string;
  body: any;
}

interface GetRequestOptions {
  endPoint: string;
}

const baseURL = process.env.NEXT_API_BASE_URL;

const getHeaders = async () => {
  const cookies = await auth();
  const token = cookies?.user.accessToken;
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// TODO: error handler module can be injected and use on http request errors
async function getRequest({ endPoint }: GetRequestOptions) {
  const headers = await getHeaders();
  const response = await fetch(`${baseURL}${endPoint}`, {
    method: "GET",
    headers,
  });
  return response.json();
}

async function postRequest({ endPoint, body }: PostRequestOptions) {
  const headers = await getHeaders();
  const response = await fetch(`${baseURL}${endPoint}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
  return response.json();
}

export async function createAccount(
  body: CreateAccountPayload
): Promise<CreateAccountResult> {
  return postRequest({ endPoint: "/auth/register", body });
}

export async function authenticateUser(
  body: AuthenticateUserPayload
): Promise<AuthenticateUserResult> {
  return postRequest({ endPoint: "/auth/login", body });
}

export async function getTasks(): Promise<Task[]> {
  return getRequest({ endPoint: "/tasks" });
}

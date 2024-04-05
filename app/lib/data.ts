import {
  AuthenticateUserPayload,
  AuthenticateUserResult,
  CreateAccountPayload,
  CreateAccountResult,
  User,
} from "./definitions";

interface PostRequestOptions {
  endPoint: string;
  body: any;
}

interface GetRequestOptions {
  endPoint: string;
  token?: string;
}

const baseURL = process.env.NEXT_API_BASE_URL;

// TODO: error handler module can be injected and use on http request errors
async function postRequest({ endPoint, body }: PostRequestOptions) {
  const response = await fetch(`${baseURL}${endPoint}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.json();
}

async function getRequest({ endPoint, token }: GetRequestOptions) {
  const headers: { [key: string]: string } = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${endPoint}`, {
    method: "GET",
    headers,
  });

  return response.json();
}

export async function getUser(token: string): Promise<User> {
  return getRequest({ endPoint: "auth/user", token });
}

export async function createAccount(
  body: CreateAccountPayload
): Promise<CreateAccountResult> {
  return postRequest({ endPoint: "auth/register", body });
}

export async function authenticateUser(
  body: AuthenticateUserPayload
): Promise<AuthenticateUserResult> {
  return postRequest({ endPoint: "auth/login", body });
}

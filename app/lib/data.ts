import {
  AuthenticateUserPayload,
  AuthenticateUserResult,
  CreateAccountPayload,
  CreateAccountResult,
  User,
} from "./definitions";

interface ApiRequestOptions {
  endPoint: string;
  body: any;
  method: "POST" | "GET";
}

const baseURL = process.env.NEXT_API_BASE_URL;

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// TODO: error handler module can be injected and use on http request errors
async function sendRequest({ endPoint, body, method }: ApiRequestOptions) {
  //  Sends a POST request to the API endpoint with the provided body.
  const response = await fetch(`${baseURL}${endPoint}`, {
    method,
    body: JSON.stringify(body),
    headers,
  });

  return response.json();
}

export async function getUser(body: User) {
  return sendRequest({ endPoint: "auth/user", body, method: "GET" });
}

export async function createAccount(
  body: CreateAccountPayload
): Promise<CreateAccountResult> {
  return sendRequest({ endPoint: "auth/register", body, method: "POST" });
}

export async function authenticateUser(
  body: AuthenticateUserPayload
): Promise<AuthenticateUserResult> {
  return sendRequest({ endPoint: "auth/login", body, method: "POST" });
}

import { RegisterPayload, RegisterResult, UserData } from "./definitions";

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

export async function getUser(body: UserData) {
  return sendRequest({ endPoint: "auth/user", body, method: "GET" });
}

export async function register(body: RegisterPayload): Promise<RegisterResult> {
  return sendRequest({ endPoint: "auth/register", body, method: "POST" });
}

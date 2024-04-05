import { RegisterPayload, RegisterResult, UserData } from "./definitions";

const baseURL = process.env.API_BASE_URL;

const headers = {
  "Content-Type": "application/json",
};

async function postApi(endPoint: string, body: any) {
  try {
    const response = await fetch(`${baseURL}${endPoint}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    });

    if (response.ok) {
      console.log({ response });
      const json = await response.json();
      console.log({ json });
      return response.json();
    }
    return Promise.reject(response.status);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function getUser(payload: UserData) {
  try {
    const result = await postApi("auth/user", payload);
    if (result) return result;
  } catch (error) {
    console.error("Error getting user data:", error);
  }
}

export async function register(payload: RegisterPayload) {
  try {
    const result: RegisterResult = await postApi("auth/register", payload);
    if (result) return result;
  } catch (error) {
    console.error("Error registering:", error);
  }
}
